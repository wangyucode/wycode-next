---
title:  数据结构与算法学习笔记02
date: 2018-3-16 20:41:04
tags:
- C
categories: Data Structures and Algorithms
---


> 线性结构的基础是数组和链表，由数组和链表可以扩展出堆栈和队列。


<!--more-->

## 实验1：计算表达式的值

将中缀表达式转换为后缀表达式，并计算表达式的值。

- 实现：

```java
import java.util.Stack;

public class Test05 {

    public static void main(String[] args) {
        String s = "2*(6/3+4)-5";
        System.out.println("中缀表达式："+s);
        s= covert(s);
        System.out.println("转换为后缀表达式："+s);
        int i = calculate(s);
        System.out.println("计算后缀表达式："+i);

    }

    private static int calculate(String s) {

        Stack<Integer> stack = new Stack<>();
        for (char c : s.toCharArray()) { //从左到右遍历，如果是数字压入堆栈，如果是操作符，从堆栈中pop出两个数字计算，并将结果压入堆栈
            if(c=='+') {
                stack.push(stack.pop() + stack.pop());
            }else if(c=='*') {
                stack.push(stack.pop() * stack.pop());
            }else if(c=='-') {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a - b);
            }else if(c=='/'){
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a / b);
            }else{
                stack.push(Character.getNumericValue(c));
            }
        }

        return stack.pop(); //循环结束时，栈顶的数字就是后缀表达式结果

    }

    private static String covert(String s) {
        StringBuilder sb = new StringBuilder();
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c >= '0' && c <= '9') { //如果是数字直接输出
                sb.append(c);
            } else if (c == '(') { //如果是左括号，压入操作堆栈
                stack.push(c);
            } else if (c == ')') { //如果是右括号
                while (true) { //寻找左括号
                    c = stack.pop();
                    if (c == '(') { //找到直接结束循环
                        break;
                    } else { //不是左括号直接输出操作符
                        sb.append(c);
                    }
                }
            } else { //如果是+ - * /

                while (true) {  //寻找栈顶比当前操作优先级低的操作符
                    if (stack.isEmpty()) { //如果是空栈，直接压入操作符
                        stack.push(c);
                        break;
                    }
                    char cInStack = stack.peek();
                    if (isStackPriority(cInStack, c)) { //如果栈顶操作符优先级高或相同，直接出栈并输出
                        sb.append(stack.pop());
                    } else {
                        stack.push(c); //找到优先级低的地方，把当前操作符push进去
                        break;
                    }
                }
            }
            //System.out.println(stack.size());
        }
        while (!stack.isEmpty()){ //最后将栈里的操作符全部输出
            sb.append(stack.pop());
        }
        return sb.toString();
    }

    private static boolean isStackPriority(char cInStack, char c2) {
        return cInStack != '(' && (cInStack == '*' || cInStack == '/' || c2 != '*' && c2 != '/');
    }
}
```



- 输出：

```bash
中缀表达式：2*(6/3+4)-5
转换为后缀表达式：263/4+*5-
计算后缀表达式：7
```

- 总结:

1. 利用堆栈可以很优雅的解决表达式运算的问题
2. 以上程序有3个缺陷：不能计算小数；不能计算负数；只能计算个位数的运算
3. 改进方向：使用浮点型计算；后缀转换时要添加对于多位数、小数、负数的处理；将结果直接保存到堆栈里，堆栈内保存数字和操作符

## 作业1：一元多项式的乘法与加法运算（20 分）

设计函数分别求两个一元多项式的乘积与和。

输入格式:

输入分2行，每行分别先给出多项式非零项的个数，再以指数递降方式输入一个多项式非零项系数和指数（绝对值均为不超过1000的整数）。数字间以空格分隔。

输出格式:

输出分2行，分别以指数递降方式输出乘积多项式以及和多项式非零项的系数和指数。数字间以空格分隔，但结尾不能有多余空格。零多项式应输出0 0。

输入样例:
```bash
5 3 4 -5 2  6 1  -2 0 0 0
5 5 20  -7 4  3 1 0 0 3 0
```
输出样例:
```bash
15 24 -25 22 30 21 -10 20 -21 8 35 6 -33 5 14 4 -15 3 18 2 -6 1
5 20 -4 4 -5 2 9 1 -2 0
```

- 实现：

```java
public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        PolyNode first1 = getInput(scanner);
        PolyNode first2 = getInput(scanner);
        PolyNode result1 = add(first1, first2);
        PolyNode result2 = multiply(first1, first2);
        print(result2);
        print(result1);

    }

    /**
     * 逐项插入算法
     *
     * @param first1
     * @param first2
     * @return
     */
    private static PolyNode multiply(PolyNode first1, PolyNode first2) {
        PolyNode p1 = first1;
        PolyNode p2 = first2;

        PolyNode first = new PolyNode(); //结果，先构造一个空的头节点
        PolyNode rear = first; //将尾部指向这个头
        while (p2 != null) { //先用第一项乘以p2构造一个初始多项式
            PolyNode next = new PolyNode(); //构造一个新节点
            next.coef = p1.coef * p2.coef; //系数相乘
            next.expon = p1.expon + p2.expon; //指数相加
            rear.next = next; //尾部指针指向新的节点
            rear = next; //新尾部等于新添加的节点
            p2 = p2.next; //移动p2指针
        }
        p1 = p1.next; //把p1指针向后挪1位
        while (p1 != null) {
            p2 = first2; //将p2指针归位
            rear = first; //尾部指针归位
            while (p2 != null) {
                int e = p1.expon + p2.expon; //指数相加
                int c = p1.coef * p2.coef; //系数相乘
                while (rear.next != null && rear.next.expon > e) { //寻找比当前指数小或者等的位置
                    rear = rear.next; //rear 往后挪
                }
                if (rear.next != null && rear.next.expon == e) { //挪了之后如果下一项存在，且指数相等，则合并系数
                    if (rear.next.coef + c == 0) { //和下一项系数相加等于0，则删掉这一项
                        rear.next = rear.next.next;
                    } else { //系数相加不为0，就要合并系数
                        rear.next.coef += c;
                    }
                } else { //指数不等，需要创建一个新节点插入
                    PolyNode newPoly = new PolyNode(); //构造一个新节点
                    newPoly.coef = c;
                    newPoly.expon = e;
                    newPoly.next = rear.next;//新插入的节点下一个=当前尾部的下一个
                    rear.next = newPoly; //当前尾部的下一个等于新节点
                }

                p2 = p2.next;//p2处理完毕，将p2挪到下一个
            }
            p1 = p1.next;//p2遍历完毕，将p1往后挪
        }
        first = first.next; //将头部挪到真实的头部位置，Java会自动回收没有引用的头节点

        return first;
    }

    private static void print(PolyNode result) {
        PolyNode p = result;
        StringBuilder sb = new StringBuilder();
        if (p == null) { //零多项式输出0 0
            sb.append("0 0");
        }
        boolean isFirst = true;
        while (p != null) {
            if (!isFirst)
                sb.append(' ');
            sb.append(p.coef);
            sb.append(' ');
            sb.append(p.expon);
            p = p.next;
            isFirst = false;
        }
        System.out.println(sb.toString());
    }

    private static PolyNode add(PolyNode first1, PolyNode first2) {
        PolyNode p1 = first1;
        PolyNode p2 = first2;

        PolyNode first = new PolyNode(); //结果，先构造一个空的头节点
        PolyNode rear = first; //将尾部指向这个头
        while (p1 != null && p2 != null) { //当两个指针都不为空时
            if (p1.coef == 0) { //系数为0,直接省略
                p1 = p1.next;
            } else if (p2.coef == 0) {
                p2 = p2.next;
            } else if (p1.expon == p2.expon) { //指数相等，则系数相加后串到后面
                int coef = p1.coef + p2.coef;  //系数相加
                if (coef != 0) {
                    PolyNode next = new PolyNode(); //构造一个新节点
                    next.coef = coef;
                    next.expon = p1.expon;
                    rear.next = next; //尾部指针指向新的节点
                    rear = next; //新尾部等于新添加的节点
                }
                p1 = p1.next; //移动指针
                p2 = p2.next;
            } else if (p1.expon > p2.expon) {//指数大的串到后面
                PolyNode next = new PolyNode(); //构造一个新节点
                next.coef = p1.coef;
                next.expon = p1.expon;
                rear.next = next; //尾部指针指向新的节点
                rear = next; //新尾部等于新添加的节点
                p1 = p1.next; //移动指针
            } else {
                PolyNode next = new PolyNode(); //构造一个新节点
                next.coef = p2.coef;
                next.expon = p2.expon;
                rear.next = next; //尾部指针指向新的节点
                rear = next; //新尾部等于新添加的节点
                p2 = p2.next; //移动指针
            }
        }

        while (p1 != null) { //p1没完，把所有p1追加到后面
            if (p1.coef != 0) { //系数不为0才，添加，否则继续找因为后面可以能还有系数不为0的
                PolyNode next = new PolyNode(); //构造一个新节点
                next.coef = p1.coef;
                next.expon = p1.expon;
                rear.next = next; //尾部指针指向新的节点
                rear = next; //新尾部等于新添加的节点
            }
            p1 = p1.next; //移动指针
        }

        while (p2 != null && p2.coef != 0) { //p2没完，把所有p2追加到后面
            if (p2.coef != 0) { //系数不为0才，添加，否则继续找因为后面可以能还有系数不为0的
                PolyNode next = new PolyNode(); //构造一个新节点
                next.coef = p2.coef;
                next.expon = p2.expon;
                rear.next = next; //尾部指针指向新的节点
                rear = next; //新尾部等于新添加的节点
            }
            p2 = p2.next; //移动指针
        }
        first = first.next; //将头部挪到真实的头部位置，Java会自动回收没有引用的头节点
        return first;
    }

    private static PolyNode getInput(Scanner scanner) {
        int count = scanner.nextInt(); //得到总项数
        PolyNode first = new PolyNode(); //构造一个空的头
        PolyNode rear = first; //构造一个尾部的指针
        while (count > 0) {
            PolyNode next = new PolyNode(); //读取一个节点
            next.coef = scanner.nextInt();
            next.expon = scanner.nextInt();
            rear.next = next; //将尾部的指针指向读到的这个节点
            rear = next; //将尾部指针挪到新添加的节点
            count--; //循环
        }
        first = first.next; //将头部挪到真实的头部位置，Java会自动回收没有引用的头节点
        return first;
    }


    static class PolyNode {
        int coef;
        int expon;
        PolyNode next;
    }
}

```

- 总结：

1. 逐项插值算法；
2. 单个对象保存一个当前类的引用可以当作链表来使用；
3. 原输入的链表不要取修改它的内部对象引用或者变量值；

## 作业1：Reversing Linked List（25 分）

Given a constant K and a singly linked list L, you are supposed to reverse the links of every K elements on L. For example, given L being 1→2→3→4→5→6, if K=3, then you must output 3→2→1→6→5→4; if K=4, you must output 4→3→2→1→5→6.

Input Specification:

Each input file contains one test case. For each case, the first line contains the address of the first node, a positive N (≤10
​5
​​ ) which is the total number of nodes, and a positive K (≤N) which is the length of the sublist to be reversed. The address of a node is a 5-digit nonnegative integer, and NULL is represented by -1.

Then N lines follow, each describes a node in the format:

`Address Data Next`
where `Address` is the position of the node, `Data` is an integer, and `Next` is the position of the next node.

Output Specification:

For each case, output the resulting ordered linked list. Each node occupies a line, and is printed in the same format as in the input.

Sample Input:
```bash
00100 8 4
00000 4 99999
00100 1 12309
68237 6 77777
33218 3 00000
77777 7 88888
99999 5 68237
12309 2 33218
88888 8 -1
```
Sample Output:
```bash
00000 4 33218
33218 3 12309
12309 2 00100
00100 1 99999
99999 5 68237
68237 6 -1
```

- 实现：

```java
package cn.wycode;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Objects;
import java.util.Stack;

public class Main {
    public static void main(String args[]) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        //读第一行
        String[] line1Array = getStringArray(reader);
        String firstAddress = line1Array[0];
        int count = Integer.parseInt(line1Array[1]);
        int k = Integer.parseInt(line1Array[2]);

        //读取所有节点
        ArrayList<Node> nodes = new ArrayList<>(count);
        for (int i = 0; i < count; i++) {
            String[] lineArray = getStringArray(reader);
            Node node = new Node();
            node.address = lineArray[0];
            node.data = Integer.parseInt(lineArray[1]);
            node.nextAddress = lineArray[2];
            nodes.add(node);
        }


        //按链表顺序加入队列
        LinkedList<Node> queue = new LinkedList<>();
        String address = firstAddress;
        while (!address.equals("-1")) {
            for (int i = 0; i < nodes.size(); i++) { //循环匹配地址
                Node n = nodes.get(i);
                if (Objects.equals(address, n.address)) { //找到则加入队列
                    queue.add(n);
                    address = n.nextAddress; //查找地址赋值为当前节点的下一个地址
                    nodes.remove(n); //处理完的移出节点数组，减少循环量
                    break;
                }
            }
        }

        Stack<Node> stack = new Stack<>();
        boolean isCanConvert = queue.size() >= k; //是否够反转
        while (!queue.isEmpty()) { //循环出队列
            Node n = queue.remove();
            if (isCanConvert) { //够反转则压入堆栈
                stack.push(n);
                if (stack.size() == k) { //压够反转数量就全部输出
                    isCanConvert = queue.size() >= k; //再次检查是否够反转
                    while (!stack.isEmpty()) {
                        //重新赋值next
                        Node nStack = stack.pop();
                        if (stack.isEmpty()) { //如果栈里没了，地址就等于队列的下一个
                            if (queue.isEmpty()) { //队列也没了，地址等于-1
                                nStack.nextAddress = "-1";
                            } else {
                                //如果剩下的还能反转
                                if (isCanConvert) {
                                    nStack.nextAddress = queue.get(k - 1).address;
                                } else {
                                    nStack.nextAddress = queue.peek().address;
                                }
                            }
                        } else {
                            nStack.nextAddress = stack.peek().address;
                        }
                        print(nStack);
                    }
                }
            } else { //不够反转 直接输出节点
                print(n);
            }
        }

    }


    private static void print(Node n) {
        System.out.println(n.address + " " + n.data + " " + n.nextAddress);
    }

    private static String[] getStringArray(BufferedReader reader) {
        String line1 = null;
        try {
            line1 = reader.readLine();
        } catch (Exception ignore) {
        }
        return line1.split(" ");
    }

    static class Node {
        String address;
        int data;
        String nextAddress;
    }
}

```


- 总结：

1. 利用队列和栈解决顺序问题

## 作业2：Pop Sequence（25 分）


Given a stack which can keep M numbers at most. Push N numbers in the order of 1, 2, 3, ..., N and pop randomly. You are supposed to tell if a given sequence of numbers is a possible pop sequence of the stack. For example, if M is 5 and N is 7, we can obtain 1, 2, 3, 4, 5, 6, 7 from the stack, but not 3, 2, 1, 7, 5, 6, 4.

Input Specification:

Each input file contains one test case. For each case, the first line contains 3 numbers (all no more than 1000): M (the maximum capacity of the stack), N (the length of push sequence), and K (the number of pop sequences to be checked). Then K lines follow, each contains a pop sequence of N numbers. All the numbers in a line are separated by a space.

Output Specification:

For each pop sequence, print in one line "YES" if it is indeed a possible pop sequence of the stack, or "NO" if not.

Sample Input:
```bash
5 7 5
1 2 3 4 5 6 7
3 2 1 7 5 6 4
7 6 5 4 3 2 1
5 6 4 3 7 2 1
1 7 6 5 4 3 2
```
Sample Output:
```bash
YES
NO
NO
YES
NO
```