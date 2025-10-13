---
title:  React Native源码解析（Android篇）
date: 2018-3-19 17:22:20
tags:
- Android
- React Native
- React
- iOS
category: Frontend
---

![React](/images/20180213_react.png)

> Facebook的React Native是比基于WebView更先进的跨平台解决方案。实现了只编写一次JavaScript代码即可同时生成Android及iOS应用，并且同时拥有原生控件的性能。此篇文章我将从React Native Android端源码中探究它到底是如何做到的。以及实现的思路，架构的设计等。


<!--more-->

## 核心类ReactActivity

使用`react-native-cli`生成工程文件，打开工程目录，发现有一个入口Activity：`MainActivity`继承自`ReactActivity`抽象类。这个`ReactActivity`是React Native项目的唯一一个Activity，可以猜想其采用了单Activity的架构。回想Unity,LibGDX这样的游戏引擎，也是采用了这样的模式。

```java
...

/**
 * Base Activity for React Native applications.
 */
public abstract class ReactActivity extends Activity
    implements DefaultHardwareBackBtnHandler, PermissionAwareActivity {

  private final ReactActivityDelegate mDelegate;

  protected ReactActivity() {
    mDelegate = createReactActivityDelegate();
  }

  ...

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mDelegate.onCreate(savedInstanceState);
  }
...
```

可以发现在Android框架创建`ReactActivity`实例的同时会创建一个`ReactActivityDelegate`对象。

然后`ReactActivity`将Activity的生命周期方法和一些回调方法注入到这个`ReactActivityDelegate`对象中。

看看这个`ReactActivityDelegate`都在干啥。


## 核心类ReactActivityDelegate

```java
...

/**
 * Delegate class for {@link ReactActivity} and {@link ReactFragmentActivity}. You can subclass this
 * to provide custom implementations for e.g. {@link #getReactNativeHost()}, if your Application
 * class doesn't implement {@link ReactApplication}.
 */
public class ReactActivityDelegate {

  ···

  private @Nullable ReactRootView mReactRootView;

  ...

  protected void onCreate(Bundle savedInstanceState) {
    if (mMainComponentName != null) {
      loadApp(mMainComponentName);
    }
    mDoubleTapReloadRecognizer = new DoubleTapReloadRecognizer();
  }

  protected void loadApp(String appKey) {
    if (mReactRootView != null) {
      throw new IllegalStateException("Cannot loadApp while app is already running.");
    }
    mReactRootView = createRootView();
    mReactRootView.startReactApplication(
      getReactNativeHost().getReactInstanceManager(),
      appKey,
      getLaunchOptions());
    getPlainActivity().setContentView(mReactRootView);
  }

  ...
}

```


`ReactActivityDelegate`在`OnCreate`方法中调用`loadApp`方法，然后创建了一个`ReactRootView`,并调用了`ReactRootView`的`startReactApplication`方法，最后将这个`ReactRootView`作为Activity的根View显示。

继续看这个`ReactRootView`。

## 核心类ReactRootView

```java

···

public class ReactRootView extends SizeMonitoringFrameLayout
    implements RootView, MeasureSpecProvider {

  ···

  /**
   * Schedule rendering of the react component rendered by the JS application from the given JS
   * module (@{param moduleName}) using provided {@param reactInstanceManager} to attach to the
   * JS context of that manager. Extra parameter {@param launchOptions} can be used to pass initial
   * properties for the react component.
   */
  public void startReactApplication(
      ReactInstanceManager reactInstanceManager,
      String moduleName,
      @Nullable Bundle initialProperties) {
      
      ···

      if (!mReactInstanceManager.hasStartedCreatingInitialContext()) {
        mReactInstanceManager.createReactContextInBackground();
      }
      
      ···
  }

  ···
}

```

这个`startReactApplication()`方法，最终调用了`ReactInstanceManager`对象的`createReactContextInBackground()`方法。

继续追这个`ReactInstanceManager`。

## 核心类ReactInstanceManager

```java
···

@ThreadSafe
public class ReactInstanceManager {

  ···

  @ThreadConfined(UI)
  public void createReactContextInBackground() {
    ···
    recreateReactContextInBackgroundInner();
  }

  ···

  
  @ThreadConfined(UI)
  public void recreateReactContextInBackground() {
    ···
    recreateReactContextInBackgroundInner();
  }

  @ThreadConfined(UI)
  private void recreateReactContextInBackgroundInner() {
    ···
    recreateReactContextInBackgroundFromBundleLoader();
  }

  @ThreadConfined(UI)
  private void recreateReactContextInBackgroundFromBundleLoader() {
    ···
    recreateReactContextInBackground(mJavaScriptExecutorFactory, mBundleLoader);
  }

  ···

  @ThreadConfined(UI)
  private void recreateReactContextInBackground(
    JavaScriptExecutorFactory jsExecutorFactory,
    JSBundleLoader jsBundleLoader) {
    ···
      runCreateReactContextOnNewThread(initParams);
    ···
  }

  @ThreadConfined(UI)
  private void runCreateReactContextOnNewThread(final ReactContextInitParams initParams) {
    ···
    mCreateReactContextThread =
        new Thread(
            new Runnable() {
              @Override
              public void run() {
                ···
                
                  final ReactApplicationContext reactApplicationContext =
                      createReactContext(
                          initParams.getJsExecutorFactory().create(),
                          initParams.getJsBundleLoader());

                 ···
                  Runnable setupReactContextRunnable =
                      new Runnable() {
                        @Override
                        public void run() {
                          try {
                            setupReactContext(reactApplicationContext);
                          } catch (Exception e) {
                            mDevSupportManager.handleException(e);
                          }
                        }
                      };

                  reactApplicationContext.runOnNativeModulesQueueThread(setupReactContextRunnable);
                 ···
              }
            });
    ···
    mCreateReactContextThread.start();
  }

  ···

  /**
   * @return instance of {@link ReactContext} configured a {@link CatalystInstance} set
   */
  private ReactApplicationContext createReactContext(
      JavaScriptExecutor jsExecutor,
      JSBundleLoader jsBundleLoader) {
    ···
    final ReactApplicationContext reactContext = new ReactApplicationContext(mApplicationContext);

    ···
    CatalystInstanceImpl.Builder catalystInstanceBuilder = new CatalystInstanceImpl.Builder()
      .setReactQueueConfigurationSpec(ReactQueueConfigurationSpec.createDefault())
      .setJSExecutor(jsExecutor)
      .setRegistry(nativeModuleRegistry)
      .setJSBundleLoader(jsBundleLoader)
      .setNativeModuleCallExceptionHandler(exceptionHandler);

    ···
      catalystInstance = catalystInstanceBuilder.build();
    
    ···
    catalystInstance.runJSBundle();
    reactContext.initializeWithInstance(catalystInstance);

    return reactContext;
  }

  ···
}

```

这个`ReactInstanceManager`有点长，通过一系列方法调用，最后通过`createReactContext()`方法创建了`ReactApplicationContext`的实例，并创建了`CatalystInstance`用于初始化`reactContext`。

在初始化`reactContext`之前又调用了`catalystInstance.runJSBundle();`，猜想这里是调用JS代码的入口，这里的`CatalystInstance`是个接口，我们要查看`CatalystInstanceImpl`来看看具体实现。

## 核心类CatalystInstanceImpl

```java

···

/**
 * This provides an implementation of the public CatalystInstance instance.  It is public because
 * it is built by XReactInstanceManager which is in a different package.
 */
@DoNotStrip
public class CatalystInstanceImpl implements CatalystInstance {
  
  ···

  public static class PendingJSCall {

    ···

    void call(CatalystInstanceImpl catalystInstance) {
      NativeArray arguments = mArguments != null ? mArguments : new WritableNativeArray();
      catalystInstance.jniCallJSFunction(mModule, mMethod, arguments);
    }

    ···
  }

  ···

  private native void jniSetSourceURL(String sourceURL);
  private native void jniRegisterSegment(int segmentId, String path);
  private native void jniLoadScriptFromAssets(AssetManager assetManager, String assetURL, boolean loadSynchronously);
  private native void jniLoadScriptFromFile(String fileName, String sourceURL, boolean loadSynchronously);

  @Override
  public void runJSBundle() {
    static {
      ReactBridge.staticInit();
    }
    ···
    mJSBundleLoader.loadScript(CatalystInstanceImpl.this);

    synchronized (mJSCallsPendingInitLock) {

      // Loading the bundle is queued on the JS thread, but may not have
      // run yet.  It's safe to set this here, though, since any work it
      // gates will be queued on the JS thread behind the load.
      mAcceptCalls = true;

      for (PendingJSCall function : mJSCallsPendingInit) {
        function.call(this);
      }
      mJSCallsPendingInit.clear();
      mJSBundleHasLoaded = true;
    }

    ···
  }

  private native void jniCallJSFunction(
    String module,
    String method,
    NativeArray arguments);

  ···
}

```

这里通过`mJSBundleLoader.loadScript()`去加载js，然后把js函数构建为`PendingJSCall`放到一个列表里逐个执行，`PendingJSCall`的`call()`方法最终调用了C++层的`jniCallJSFunction()`函数。

文件开头使用静态代码块`ReactBridge.staticInit()`装载了名为`reactnativejni`的so文件。

至此java层源码就追完了，我们接着看c++层源码

## C++层

```c++
···

namespace facebook {
namespace react {

···

void CatalystInstanceImpl::initializeBridge(
    jni::alias_ref<ReactCallback::javaobject> callback,
    // This executor is actually a factory holder.
    JavaScriptExecutorHolder* jseh,
    jni::alias_ref<JavaMessageQueueThread::javaobject> jsQueue,
    jni::alias_ref<JavaMessageQueueThread::javaobject> nativeModulesQueue,
    jni::alias_ref<jni::JCollection<JavaModuleWrapper::javaobject>::javaobject> javaModules,
    jni::alias_ref<jni::JCollection<ModuleHolder::javaobject>::javaobject> cxxModules) {
  // TODO mhorowitz: how to assert here?
  // Assertions.assertCondition(mBridge == null, "initializeBridge should be called once");
  moduleMessageQueue_ = std::make_shared<JMessageQueueThread>(nativeModulesQueue);

  // This used to be:
  //
  // Java CatalystInstanceImpl -> C++ CatalystInstanceImpl -> Bridge -> Bridge::Callback
  // --weak--> ReactCallback -> Java CatalystInstanceImpl
  //
  // Now the weak ref is a global ref.  So breaking the loop depends on
  // CatalystInstanceImpl#destroy() calling mHybridData.resetNative(), which
  // should cause all the C++ pointers to be cleaned up (except C++
  // CatalystInstanceImpl might be kept alive for a short time by running
  // callbacks). This also means that all native calls need to be pre-checked
  // to avoid NPE.

  // See the comment in callJSFunction.  Once js calls switch to strings, we
  // don't need jsModuleDescriptions any more, all the way up and down the
  // stack.

  moduleRegistry_ = std::make_shared<ModuleRegistry>(
    buildNativeModuleList(
       std::weak_ptr<Instance>(instance_),
       javaModules,
       cxxModules,
       moduleMessageQueue_));

  instance_->initializeBridge(
    folly::make_unique<JInstanceCallback>(
    callback,
    moduleMessageQueue_),
    jseh->getExecutorFactory(),
    folly::make_unique<JMessageQueueThread>(jsQueue),
    moduleRegistry_);
}

···

void CatalystInstanceImpl::jniCallJSFunction(std::string module, std::string method, NativeArray* arguments) {
  // We want to share the C++ code, and on iOS, modules pass module/method
  // names as strings all the way through to JS, and there's no way to do
  // string -> id mapping on the objc side.  So on Android, we convert the
  // number to a string, here which gets passed as-is to JS.  There, they they
  // used as ids if isFinite(), which handles this case, and looked up as
  // strings otherwise.  Eventually, we'll probably want to modify the stack
  // from the JS proxy through here to use strings, too.
  instance_->callJSFunction(std::move(module),
                            std::move(method),
                            arguments->consume());
}

···

}}

```

在这个`CatalystInstanceImpl.cpp`中可以发现c++对于js的调用。以及非常棒的两段注释。

React Navtive 通过C++层去解释执行JS，从而达到一个比较好的性能。


## 总结

通过此文算是搞明白了，Android系统是怎么样去执行JavaScript代码的。
但React Native又是如何将JS中的组件渲染成Android原生组件的仍然是个疑问。
以后再研究吧...