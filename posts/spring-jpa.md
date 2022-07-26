---
title: 使用SpringJPA框架
date: 2017-7-11 13:05:37
tags:
- Spring
- JPA
- Java
category: Backend
---

> Spring JPA框架提供了非常强大的数据库持久化方案，仅仅通过定义接口就能实现很多查询功能，甚至不用写具体实现代码。通过接口定义的抽象方法Spring JPA就知道该做什么了。

下面将基本的使用总结如下：

<!--more-->
## 接口能力

- 定义接口继承`CrudRepository<T, ID>`即可获得增删改查能力；
- 定义接口继承`PagingAndSortingRepository<T, ID>`获得增删改查能力的同时增加分页查询能力；

声明后可以直接使用`@Autowired`注入使用，无需实现。

## 关键词
- `find…By`
- `count…By`
- `Distinct`
- `IgnoreCase`
- `AllIgnoreCase`
- `And`
- `Or`
- `Between`
- `LessThan`
- `GreaterThan`
- `Like `
- `OrderBy`
- `Asc`
- `Desc`
- `OrderBy`

## 一些例子

```java
//简单示例
List<Person> findByEmailAddressAndLastname(EmailAddress emailAddress, String lastname);

// 去重标志
List<Person> findDistinctPeopleByLastnameOrFirstname(String lastname, String firstname);
List<Person> findPeopleDistinctByLastnameOrFirstname(String lastname, String firstname);

// 对某个字段忽略大小写
List<Person> findByLastnameIgnoreCase(String lastname);

// 对所有字段忽略大小写
List<Person> findByLastnameAndFirstnameAllIgnoreCase(String lastname, String firstname);

// 静态 ORDER BY 查询
List<Person> findByLastnameOrderByFirstnameAsc(String lastname);
List<Person> findByLastnameOrderByFirstnameDesc(String lastname);

//分页
Page<User> findByLastname(String lastname, Pageable pageable);
Slice<User> findByLastname(String lastname, Pageable pageable);
List<User> findByLastname(String lastname, Sort sort);
List<User> findByLastname(String lastname, Pageable pageable);

//限制查询结果
User findFirstByOrderByLastnameAsc();
User findTopByOrderByAgeDesc();
Page<User> queryFirst10ByLastname(String lastname, Pageable pageable);
Slice<User> findTop3ByLastname(String lastname, Pageable pageable);
List<User> findFirst10ByLastname(String lastname, Sort sort);
List<User> findTop10ByLastname(String lastname, Pageable pageable);

//通过userId和gameId查询GameScore实体
GameScore findByUserIdAndGameId(String userId,int gameId);
//通过gameId查询分页数据，并根据score字段倒序排序
List<GameScore> findByGameIdOrderByScoreDesc(int gameId,Pageable page);
//通过gameId计数，条件是大于传入的score
int countByGameIdAndScoreGreaterThan(int gameId,long score);
```
