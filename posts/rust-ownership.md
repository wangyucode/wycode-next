---
title: 理解Rust语言的所有权以及借用、引用、切片。
date: 2021-1-23 12:05:02
tags:
- Rust
categories: Languages
---

![Rust](https://www.rust-lang.org/static/images/rust-logo-blk.svg)

> Rust由Mozilla基金会开发，没有虚拟机和垃圾回收，却又提供了内存安全，有着媲美C/C++的性能，又同时支持命令式函数式编程以及泛型等便利。优雅（上层抽象）和高性能（底层控制）往往是鱼和熊掌不可兼得，但Rust试图挑战这一矛盾。允许你做带垃圾回收的语言（例如Java）做不到的事，比如控制底层。而同时又避免了比如空指针，野指针在内的（例如C/C++）的问题。它被用于开发浏览器引擎(`Servo`)，操作系统(`Redox OS`)，并且特别适合开发`WebAssembly`和嵌入式，以及高性能的Web服务。

> 本文介绍Rust语言中和其它语言相比一个非常重要的特性`所有权(Ownership)`以及其相关的`借用(Borrowing)`，`引用(References)`，`切片(Slice)`的理解和使用。这个特性保证了Rust不需要垃圾回收以及强大的内存安全，同时还能在多线程编程中带来好处。

<!--more-->

## 所有权(Ownership)

废话不多说，先看代码:

```Rust
let a = 5;
let b = a;
println!("a->{}, b->{}", a, b);
```
- 上面的代码会打印出`a->5, b->5`，和直觉（其它语言）相同。
- `a`和`b`是`i32`类型，属于基础数据类型，存储在**栈**上。
- 当把`b`赋值给`a`时，会进行拷贝。所以在栈上会有两个`5`。

但是：

```Rust
let s1 = String::from("hello");
let s2 = s1;
println!("s1->{}, s2->{}", s1, s2);
```

- 上面的代码无法通过编译。因为`s1`的**所有权**发生了转移(`move`)。
- 在把`s1`赋值给`s2`之后，`s1`就无法再使用了。
- `s1`和`s2`被存储在**栈**上，但是`hello`这个字符串存储在**堆**上
- `s1`和`s2`是`String`类型，`String`类型不是基础数据类型，它是实际字符串的基本信息，包含了指向堆内存的指针、长度、容量信息。
- 赋值时，栈上的`String`即指针，长度、容量被拷贝了，但堆上的`hello`没有被拷贝。
- 这样就保证了堆上的内存始终只有一个所有者`owner`。
- Rust会在`Owner`离开作用域后自动释放`Drop`它所指向的堆内存。同时避免二次释放带来的内存问题和安全漏洞。

![Move](https://doc.rust-lang.org/book/img/trpl04-04.svg)

## 引用(References)和借用(Borrowing)

再看一个函数的例子：

```Rust
fn main() {
    let s1 = String::from("hello");
    let length = get_length(s1);
    println!("{}",s1);
}

fn get_length(str: String) -> usize {
    str.len()
}
```
- 上面的代码无法通过编译，因为`s1`的**所有权**被转移到了`get_length`函数里面。并在出了函数之后就被释放了。
- 其中一个解决方案是让`get_length`通过元组`tuple`同时返回`str`。此时可以用`s1`继续接收`str`，即隐藏`shadowing`。

我们也可以通过传递**引用**`References`来解决这个问题：

```Rust
fn main() {
    let s1 = String::from("hello");
    let len = get_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn get_length(str: &String) -> usize {
    str.len()
}
```

将获取引用作为函数参数称为**借用**`borrowing`

## 可变引用（Mutable References）

如果要在函数内修改**借用的值**则必须使用可变引用：

```Rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

- Rust中所有的变量默认是不可变的，不可变代表了安全。
- 同一作用域中，不可变引用可以有多个，即多个**读引用**是ok的。但是不能同时存在可变引用和不可变引用。
- 同一作用域中，可变引用只能有一个，即**写引用**只能有一个。

这些规则保证了Rust不可能出现**悬垂指针**（dangling pointer）或**空指针**（null pointer）异常。
也减轻了多线程中的**竞争状态**（Race conditions）和**死锁**（Deadlocks）问题

## 切片(Slice)

三句话说清楚切片`Slice`：

- 切片没有所有权，因为它是对数组或者字符串等集合某个区间的不可变引用。
- 它的作用是，我们想使用集合中某个数据，又怕其他人对集合做了修改（比如清空了集合的元素）时能够提前发现bug。
- 原理是上一节提到的，同一作用域不能同时存在可变引用和不可变引用。

## Rust的缺点

目前发现Rust最大的缺点就是：想写一个能够编译通过的代码实在是太难了，哈哈。

但正是因为Rust拥有强大的编译器，它能够提前把bug扼杀在摇篮里，在编译阶段就拒绝各种各样的bug，从而同时保证程序的性能和安全。

这也是为什么Typescript，敏捷开发，TDD，会火的原因了。**尽可能早的发现和解决问题。**
