---
layout: post
title: 爱奇艺校招—删除重复字符
date: 2019-03-19 
tag: Java 
---   

<br>

 
 
### 题目

  牛牛有一个由小写字母组成的字符串s,在s中可能有一些字母重复出现。比如在"banana"中,字母'a'和字母'n'分别出现了三次和两次,但是牛牛不喜欢重复。对于同一个字母,他只想保留第一次出现并删除掉后面出现的字母。请帮助牛牛完成对s的操作。

  **输入描述**         

>输入包括一个字符串s,s的长度length(1 ≤ length ≤ 1000),s中的每个字符都是小写的英文字母('a' - 'z')


  **输出描述**


>输出一个字符串,表示满足牛牛要求的字符串


  **示例**
  

>输入：  
>banana  
>输出：  
>ban


### 分析         
  
  方法一：使用StringBuffer类的deleteCharAt()方法删除重复位置的元素即可  
  方法二：使用索引为i的元素去遍历其后的所有元素，如果相同则把后面的元素改为空格再使用String类的split()方法把修改后的字符串分割成小字符串，最后连接即可  


### 方法一代码   
```
import java.util.Scanner;
public class Main{
    public static String getResult(StringBuffer str){
        for(int i=0;i<str.length();i++){
            for(int j=i+1;j<str.length();j++){
                if(str.charAt(i)==str.charAt(j)){
                    str.deleteCharAt(j);
                    j--;
                }
            }
        }
        String result=str.toString();
        return result;
    }
    public static void main(String[] args){
        Scanner scan=new Scanner(System.in);
        String s=scan.nextLine();
        StringBuffer str=new StringBuffer(s);
        System.out.println(getResult(str));
    }
}
```


### 方法二代码   

```
import java.util.Scanner;
public class Main{
    public static String deletTheSame(String str){
        StringBuffer s=new StringBuffer(str);
        int n=str.length();
        for(int i=0;i<n;i++){
            if(s.charAt(i)==' ')
                continue;
            for(int j=i+1;j<n;j++){
                if(s.charAt(i)==s.charAt(j))
                    s.setCharAt(j,' ');
            }
        }
        String[] str2=s.toString().split(" ");
        String result="";
        for(int i=0;i<str2.length;i++)
            result=result+str2[i];
        return result;
    }
    public static void main(String[] args){
        Scanner scan=new Scanner(System.in);
        String str=scan.nextLine();
        System.out.println(deletTheSame(str));
    }
}
```

### 知识点


   * 知识点一：**StringBuffer和String之间的转换**  
   
>StringBuffer ----> String    
----  

```
String s = "hello";  
//不能直接把string的值赋给StringBuffer  
StringBuffer str = "hello";  

//方式一：用StringBuffer的构造方法赋值  
StringBuffer s1 = new StringBuffer(s);  

//方式二：用append方法  
StringBuffer s2 = new StringBuffer();  
s2.append(s);  
```  

>String ----> StringBuffer  
----  

```
StringBuffer s = new StringBuffer("java");  

//方式一：构造方法：  
String s1= new String(s);  

//方式二：用StringBuffer的toString()方法  
String s2 = s3.toString();  
//toString()方法返回值是String,调用类名是StringBuffer类  
System.out.println("s2: " + s2);  
```

* 知识点二：**StringBuffer类的常用方法**  
	
```
StringBuffer s = new StringBuffer("Hello ");

s.append("world"); //在s尾部追加一个字符串, 此时变成Hello world

s.charAt(1) ; //返回下标为1的字符此处是 e

s.insert(1,"d"); //在1处插入新的字符串d，此时变为Hdello world

s.reverse(); //反转字符，此时变成dlrow olledH

s.delete(1,2); //删除索引从1到2的字符串（不包括2），此时变为drow olledH

s.replace(3,4,"new"); //替换字符串从3开始到4结束（不包括4），此时变为dronew olledH

s.setCharAt(1,'p');//索引为1处的字符修改成p，此时变为dponew olledH

s.deleteCharAt(2);//删除索引为2处的字符，此时变为dpnew olledH

```



转载请注明原地址:[KK's Blog](http://www.inankai.top)

