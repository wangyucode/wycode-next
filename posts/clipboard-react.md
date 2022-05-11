---
title: 用React做一个跨平台剪切板
date: 2018-2-13 09:55:00
tags:
- React
- JavaScript
categories: Front-end
---

![React](/images/20180213_react.png)

> 这篇文章我们将用React实现一个跨平台剪切板。


通常我们会遇到将手机上的文字发送到电脑上，或者反过来，或者是记录一些网址，你懂得。这时我们会用到一些云笔记之类的产品，或者干脆使用微信或QQ，它们都太重了，用起来没那么方便，还要登录注册啥的。我们使用React来开发一款手机和电脑上都能访问，并且无需注册登录的云便签应用。

<!--more-->

## 1.使用`create-react-app`创建工程

```bash
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```

## 2.编写模版

```html
render() {
        return (
            <div>
                <Header/>
                <div className="Clipboard container">
                    <input placeholder="查询码"
                           type="number"
                           className="input-query-number form-control form-group"
                           value={this.state.queryNumber > 0 ? this.state.queryNumber : ''}
                           disabled={this.state.isShowResult}
                           onChange={this.handleNumberChange}/>
                    {this.state.isShowResult ? null : <button onClick={this.handleQuery}
                                                              className="btn-query btn btn-primary form-control form-group">查询</button>}

                    {this.state.isShowResult ? null :
                        <button onClick={this.handleNew}
                                className="btn-new btn btn-primary form-control form-group">新建</button>}

                    {this.state.isShowResult ? <textarea onChange={this.handleTextChange} value={this.state.text}
                                                         className="textarea-text form-control form-group"/> : null}

                    {this.state.isShowResult ? <button onClick={this.handleSave}
                                                       className="btn-save btn btn-success form-control  form-group">保存</button> : null}
                </div>
            </div>
        );
    }

```

- `render()`返回的`JSX`只能有一个组件，当需要多个组件时，需要用一个`div`包起来；
- 这里通过state的自定义属性`isShowResult`实现对控件的隐藏和显示；
- 界面使用Bootstrap框架做移动端适配
- 通过`onClick={this.handleSave}`,`onChange={this.handleTextChange}`等属性绑定函数，构造函数里还要写`this.handleBack = this.handleBack.bind(this);`

## 3.构造方法

```JavaScript
constructor(props) {
        super(props);
        this.state = {
            queryNumber: -1,
            isShowResult: false,
            text: ''
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
```

- `state`中维护了页面状态，这里只需要3个参数：查询码，是否显示查询结果，剪切板文字

## 4.逻辑

```JavaScript
 handleNumberChange(event) {
        this.setState({queryNumber: event.target.value});
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleBack(event){
        this.setState({isShowResult: false});
    }

    handleQuery(event) {
        if(this.state.queryNumber<=0){
            alert('查询码不正确！');
            return
        }
        let data = {
            params: {
                id: this.state.queryNumber
            }
        };
        axios.get('https://wycode.cn/web/api/public/clipboard/query',data)
            .then((response) =>{
                if(response.status!==200||response.data.data==null){
                    throw '查询码不正确！'
                }
                this.setState({
                    isShowResult: true,
                    queryNumber: response.data.data.id,
                    text: response.data.data.content
                })
            })
            .catch((error) => alert(error));
    }

    handleNew(event) {
        axios.post('https://wycode.cn/web/api/public/clipboard/create')
            .then((response) => this.setState({
                isShowResult: true,
                queryNumber: response.data.data.id,
                text: response.data.data.content
            }))
            .catch((error) => alert(error));
    }

    handleSave(event) {
        let data = new FormData();
        data.append('id',this.state.queryNumber);
        data.append('content',this.state.text);
        axios.post('https://wycode.cn/web/api/public/clipboard/save',data)
            .then((response) => this.setState({
                isShowResult: false,
                queryNumber: response.data.data.id,
                text: response.data.data.content
            }))
            .catch((error) => alert(error));
    }

```

- 使用`this.setState({});`更改页面状态
- 这里使用`Axios`做网络请求。`Axios`是一个js网络请求库。
- 在网络请求返回函数里 `this`做作用域是当前对象，会发生错误，使用箭头符=>，即lambda表达式就没有问题。或者在外部创建一个`this`的引用`let that = this;`


至此大功告成！访问 https://wycode.cn/clipboard/ 查看示例
访问 https://github.com/wangyucode/React-Learning 查看完整源码