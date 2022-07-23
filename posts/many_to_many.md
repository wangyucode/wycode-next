---
title: Spring JPA框架中的@ManyToMany多对多关系的理解和使用
date: 2018-4-19 15:02:55
tags:
- Spring
- JPA
- Java
categories: Backend
---

> JPA是Java Persistence API的简称是Java的ORM规范，实现这个规范的有著名的Hibernate等ORM框架。JDK 5.0注解或XML描述对象－关系表的映射关系，并将运行期的实体对象持久化到数据库中。

![Spring](/images/20180419_spring_framework.svg)

多对多关系是关联关系中最复杂的。本文使用Spring JPA框架总结多对多关系及`@ManyToMany`注解的详细使用。明白了`@ManyToMany`,其它
`@OneToMany` 和`@OneToOne`就简单很多了。

<!--more-->

## Java和JPA中的多对多关系

> 根据维基百科定义：Java中的多对多关系是指源对象具有目标对象集合的属性，并且（如果存在的话）这个目标对象与原对象具有反向关系，则它也将成为多对多关系。需要注意的是：Java和JPA中的所有关系都是单向的，因为存在源对象引用目标对象的情况下，也不能保证目标对象也与原对象有关系。这与关系数据库不同，在关系数据库中，通过外键定义并查询，使得反向查询总是存在的。

> JPA还定义了一个OneToMany关系，它与ManyToMany关系类似，但反向关系（如果已定义）是ManyToOne关系。 OneToMany与JPA中ManyToMany关系的主要区别在于，ManyToMany总是使用中间关系连接表来存储关系，OneToMany可以使用连接表或者目标对象的表引用中的外键源对象表的主键。

传统项目开发，会有一个设计表的过程，然后由DBA写一大堆`create table ***`。很麻烦也很慢。

JPA框架在运行时，会根据实体定义自动创建表，自动更新表字段，使用JPA可以说一行SQL都不用写，甚至不用关心底层数据库到底是`MySQL`还是`Oracle`还是其它。以下例子中我不定义表名，列名，所以没有`@Column`、`@Table`、`@JoinTable`、`@JoinColumn`等。由JPA框架自动根据实体名称生成表名，列名。我觉得Hibernate生成的表名和列名挺好也符合规范。就不多此一举了。

## @ManyToMany 注解

在JPA中使用`@ManyToMany`注解表示多对多关系。

学生和老师，典型的多对多关系:

```java
@Entity
public class Student {
    @Id
    private String id;
    @ManyToMany
    private List<Teacher> teachers;
}

@Entity
public class Teacher {
    @Id
    private String id;
    @ManyToMany
    private List<Student> students;
}
```

上面例子中的`@ManyToMany`即表示了老师和学生的多对多关系。`@ManyToMany`注解可以用在字段或方法上。

但这样做是有问题的，生成的中间表有两个，`TEACHER_STUDENTS`表和`STUDENT_TEACHERS`。原因是这里的多对多关系正是维基百科提到的单向原则。老师和学生虽然分别定义了自己的多对多关系，但这个关系都是单向的，要使关系成为双向。就需要下面的`mappedBy`属性。

## mappedBy 属性

`mappedBy`是OneToOne、OneToMany和ManyToMany这三种关联关系的属性。

用来标注**拥有**这种关系的字段。 除非关系是单向的，否则是必需的。

那么什么叫拥有关联关系呢，假设是双向一对一的话，那么拥有关系的这一方有建立、解除和更新与另一方关系的能力。而另一方没有，只能被动管理。

由于`JoinTable`和`JoinColumn`一般定义在拥有关系的这一端，而`mappedBy`一定是定义在关系的被拥有方（the owned side），也就是跟定义`JoinTable`和`JoinColumn`互斥的一方，它的值指向拥有方中关于被拥有方的字段，可能是一个对象（`OneToMany`），也可能是一个对象集合（`ManyToMany`）。

上面的例子中，维护老师和学生的多对多关系，明显只需要一张中间表就可以了，我们假设老师是维护关系（拥有关系）的一端，则实体定义修改如下：

```java
@Entity
public class Student {
    @Id
    private String id;
    @ManyToMany(mappedBy = "students")
    private List<Teacher> teachers;
}

@Entity
public class Teacher {
    @Id
    private String id;
    @ManyToMany
    private List<Student> students;
}
```

这时中间表只有一张`TEACHER_STUDENTS`，关联关系也变成了我们想要的双向关系。

## Cascade 级联关系

实际业务中，我们通常会遇到以下情况：

1. 用户和用户的收货地址是一对多关系，当用户被删除时，这个用户的所有收货地址也应该一并删除。
2. 订单和订单中的商品也是一对多关系，但订单被删除时，订单所关联的商品肯定不能被删除。

此时只要配置正确的级联关系，就能达到想要的效果。

### 级联关系类型：

- CascadeType.REFRESH：级联刷新，当多个用户同时作操作一个实体，为了用户取到的数据是实时的，在用实体中的数据之前就可以调用一下refresh()方法
- CascadeType.REMOVE：级联删除，当调用remove()方法删除Order实体时会先级联删除OrderItem的相关数据
- CascadeType.MERGE：级联更新，当调用了Merge()方法，如果Order中的数据改变了会相应的更新OrderItem中的数据
- CascadeType.ALL：包含以上所有级联属性
- CascadeType.PERSIST：级联保存，当调用了Persist() 方法，会级联保存相应的数据

需要注意的是，`CascadeType.ALL`要谨慎使用，为了达到数据同步，很多人喜欢用`CascadeType.ALL`来实现。但上面订单和商品的例子就不适用。

关于级联关系的例子后面再补充。

## 以上

- 未经同意禁止转载！
- 不对的地方欢迎指正！
- 欢迎点击关于打赏我！
- 欢迎使用我的小程序：跨平台剪切板，养鱼小助手！

![跨平台剪切板](/images/20180213_clipboard.jpg)
![养鱼小助手](/images/20180419_fish_logo.jpg)
