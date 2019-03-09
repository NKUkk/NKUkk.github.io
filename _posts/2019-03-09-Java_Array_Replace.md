---
layout: post
title: 剑指offer—一维数组替换
date: 2019-03-09 
tag: Java 
---   

<br>

 
 
### 题目

  请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。


### 分析         
  
  方法一：使用StringBuffer类的相关方法
  方法二：由于使用三个字符替换一个字符，可以新建一个字符串用来存储结果。遍历原字符串，不是空格的部分直接复制，空格部分替换。


### 方法一代码   
```
public class Solution {
    public String replaceSpace(StringBuffer str) {
    	int index=str.indexOf(" ");
        while(index!=-1){
            str.replace(index,index+1,"%20");
            index=str.indexOf(" ",index);
        }
        String result=str.toString();
        return result;
    }
}
```


### 方法二代码   

```
public class Solution {
    public String replaceSpace(StringBuffer str) {
    	int len=str.length();
        //统计空格出现次数
        int num=0;
        for(int i=0;i<len;i++)
            if(str.charAt(i)==' ')
                num++;
        //新数组的长度
        int newlen=len+num*2;
        char newstr[]=new char[newlen];
        //新数组和原字符串同时遍历
        for(int i=0,j=0;i<len;i++){
            //原字符串不是空格直接复制
            if(str.charAt(i)!=' '){
                newstr[j]=str.charAt(i);
                j++;
            }
            //是空格就替换
            else{
                newstr[j]='%';
                newstr[j+1]='2';
                newstr[j+2]='0';
                j+=3;
            }
        }
        //char型转换成String
        String result=String.valueOf(newstr);
        return result;
    }
}
```

### 知识点


    方法一：
    使用indexOf()方法查找空格，返回一个整数。若有空格，返回的是空格的索引，没有空格返回-1。因此如果返回的不是-1，则字符串中有空格，使用replace()方法替换indexOf()返回的索引处的空格即可，然后使用indexOf()从当前位置继续查找，替换已有的索引值。
	要注意使用while循环，因为字符串中可能含有多个空格。
    
	方法二：
	要熟练掌握String类的charAt()方法以及转换成String类的方法String.valueOf()、toString()
	
### 知识扩充


#### String.valueOf()：
	
    String 类别中已经提供了将基本数据型态转换成 String 的 static 方法 ，也就是 String.valueOf() 这个参数多载的方法，有以下几种：
	  （1）String.valueOf(boolean b) : 将 boolean 变量 b 转换成字符串 
      （2）String.valueOf(char c) : 将 char 变量 c 转换成字符串 
      （3）String.valueOf(char[] data) : 将 char 数组 data 转换成字符串 
      （4）String.valueOf(char[] data, int offset, int count) : 将 char 数组 data 中 由 data[offset] 开始取 count 个元素 转换成字符串 
      （5）String.valueOf(double d) : 将 double 变量 d 转换成字符串 
      （6）String.valueOf(float f) : 将 float 变量 f 转换成字符串 
      （7）String.valueOf(int i) : 将 int 变量 i 转换成字符串 
	  （8）String.valueOf(long l) : 将 long 变量 l 转换成字符串 
      （9）String.valueOf(Object obj) : 将 obj 对象转换成 字符串, 等于 obj.toString() 
	  用法如下: 
	  ```
　　     int i = 10; 
　　     String str = String.valueOf(i); 
　　  ```
      这时候 str 就会是 "10" 

#### toString()：

    （1）undefined和null没有toString()方法
	 ```
	 undefined.toString();//错误
     null.toString();//错误
	 ```
	（2）布尔型数据true和false返回对应的'true'和'false'
	 ```
	 true.toString();//'true'
     false.toString();//'false'
     Boolean.toString();//"function Boolean() { [native code] }"
	 ```
	（3）字符串类型原值返回
	 ```
	 '1'.toString();//'1'
     ''.toString();//''
     'abc'.toString();//'abc'
     String.toString();//"function String() { [native code] }"
	 ```
	（4）正浮点数及NaN、Infinity加引号返回
	 ```
	 1.23.toString();//'1.23'
     NaN.toString();//'NaN'
     Infinity.toString();//'Infinity'
	 ```
	 
	 负浮点数或加'+'号的正浮点数直接跟上.toString()，相当于先运行toString()方法，再添加正负号，转换为数字
	 ```
	 +1.23.toString();//1.23
     typeof +1.23.toString();//'number'
     -1.23.toString();//-1.23
     typeof -1.23.toString();//'number'
	 ```
	 
	 整数直接跟上.toString()形式，会报错，提示无效标记，因为整数后的点会被识别为小数点
	 ```
	 0.toString();//Uncaught SyntaxError: Invalid or unexpected token
	 ```
	 
	 因此，为了避免以上无效及报错的情况，数字在使用toString()方法时，加括号可解决
	 ```
	 1.23.toString();//'1.23'
	 (0).toString();//'0'
     (-0).toString();//'0'
     (+1.2).toString();//'1.2'
     (-1.2).toString();//'-1.2'
     (NaN).toString();//'NaN'
	 Number.toString();//"function Number() { [native code] }"
	 ```
	 
	 此外，数字类型的toString()方法可以接收表示转换基数(radix)的可选参数，如果不指定此参数，转换规则将是基于十进制。同样，也可以将数字转换为其他进制数(范围在2-36)
     ```
	 var n = 17;
     n.toString();//'17'
     n.toString(2);//'10001'
     n.toString(8);//'21'
	 n.toString(10);//'17'
	 n.toString(12);//'15'
	 n.toString(16);//'11'
	 ```



转载请注明原地址:[KK's Blog](http://www.xiaobaozi.xyz)

