---
layout: post
title: 招行笔试—字符串是否由子串拼接
date: 2019-03-9 
tag: Java 
---   

<br>

 
 
### 题目

  给出一个非空的字符串，判断这个字符串是否是由它的一个子串进行多次首尾拼接构成的。
  例如，"abcabcabc"满足条件，因为它是由"abc"首尾拼接而成的，而"abcab"则不满足条件。


### 分析         
  
  首先，字符串的子串如果可以多次重复构成原字符串，那么这个子串的长度一定小于原字符串长度的一半。对原字符串的前半部分依次形成长度递增的子串，并把每次的子串重复连接，形成一个新的字符串，判断这个字符串和原字符串是否相等，即可。


### 代码   
```
import java.util.Scanner;

public class Main{
    public static String FindSon(String str){
        //获得str的长度
        int len=str.length();
        //新建一个String存储结果
        String result="";
        for(int i=1;i<=len/2;i++){
            //判断str能不能由i个字符重复拼接而成，即len要是i的倍数
            if(len%i==0){
                //获得这i个字符
                String sub=str.substring(0,i);
                //新建一个String对象用来存储i个字符重复拼接形成的字符串
                String S="";
                //len是i的多少倍，i个字符就重复多少遍，形成一个字符串
                for(int j=1;j<=len/i;j++){
                    S=S+sub;
                }
                //判断形成的S和一开始的str是否相同
                if(S.equals(str)){
                    result=sub;
                }
            }
        }
        return result;
    }
    public static void main(String[] args){
        Scanner scan=new Scanner(System.in);
        String sc=scan.nextLine();
        String son=FindSon(sc);
        if(son.equals(""))
            System.out.println(false);
        else
            System.out.println(son);
    }
}
```


### 结果图

![](/images/posts/Java_String_subString/result.jpg)


### 知识点

   没什么知识点，想明白就好。（可能是我没想到呢:)）
    
	
### 知识扩充

   **substring()方法：**  
	
   语法：  
	
```
public String substring(int beginIndex)

或

public String substring(int beginIndex, int endIndex)	
```

   参数：  
	
   beginIndex -- 起始索引（包括）, 索引从 0 开始。  
   endIndex -- 结束索引（不包括）。  
	
   返回值：  
	
   子字符串。
	
   实例：
	
```
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.runoob.com");
 
        System.out.print("返回值 :" );
        System.out.println(Str.substring(4) );
 
        System.out.print("返回值 :" );
        System.out.println(Str.substring(4, 10) );
    }
}
```

   执行结果：
	
```
返回值 :runoob.com
返回值 :runoob
```

   **类方法对同类中别的方法的调用**  
	
   ① 调用类方法可以直接调用：一开始本题中的FindSon()方法前面没有添加static修饰符，报错为：

![](/images/posts/Java_String_subString/error.jpg)
	
   ② 调用实例方法必须通过创建实例来调用


<br>  
<br>  
转载请注明原地址:[KK's Blog](http://www.inankai.top)


