---
layout: post
title: 拼多多校招—最大乘积
date: 2019-03-11 
tag: Java 
---   

<br>

 
 
### 题目

  给定一个无序数组，包含正数、负数和0，要求从中找出3个数的乘积，使得乘积最大，要求时间复杂度：O(n)，空间复杂度：O(1)

![](/images/posts/Java_Array_FingBigProduct/example.jpg)


### 分析         
  
  这次的分析是我的整个做题过程，一步一步来。  
  
  首先，要求一个数组中的三个数的乘积的最大值，好的，那么这个最大值可能是哪三个数的乘积呢？  
  
  主要就是看看数组里有没有负数。没有负数的话，就是最大数、次大数、第三大数的乘积。要是有  

  负数，那就看有几个负数，有一个负数，那么最大数还是前面那种情况，要是有两个及以上的负数，  

  那就要比较一下最小数、次小数、最大数的乘积和最大的那三个数的乘积的大小了。  
  
  OK，思路有了，开始写吧！  


### 代码   
```
import java.util.Scanner;
public class Main{
    public static int getBig(int[] a){
        int min=a[0],max=a[0];
        int num=a.length;
        for(int i:a){
            if(i>max)
                max=i;
            if(i<min)
                min=i;
        }
        int n=max-min+1;
        int[] b=new int[n];
        for(int i=0;i<num;i++)
            b[a[i]-min]++;
        for(int i=0,j=0;i<n;i++){
            while(b[i]!=0){
                a[j++]=min+i;
                b[i]--;
            }
        }
        if(a[0]<0&&a[1]<0)
            return Math.max(a[0]*a[1]*max,a[num-1]*a[num-2]*a[num-3]);
        else
            return a[num-1]*a[num-2]*a[num-3];
    }
    public static void main(String[] args){
        Scanner scan=new Scanner(System.in);
        String S=scan.nextLine();
        String[] s=S.split(" ");
        int[] a=new int[s.length];
        for(int i=0;i<s.length;i++)
        	a[i]=Integer.parseInt(s[i]);
        System.out.println(getBig(a));
    }
}
```


### 结果

   输入一下，给出的一个例子（3 1 2 4），看看输出是不是24.
	
![](/images/posts/Java_Array_FingBigProduct/result1.jpg)

   美滋滋，可以啦。那再试试有负数的看看行不行，现编一个（-1 -1 2 3 10），看看结果是不是60.
	
![](/images/posts/Java_Array_FingBigProduct/result2.jpg)

   OK了！美美地去原题处提交，结果：

![](/images/posts/Java_Array_FingBigProduct/result3.jpg)

   emmmmm这个我想的不太一样啊，看着0.00%陷入了沉思。思考良久也没有发现问题，只好百度一波了，结果发现，大家都先输入数组的长度，再输入数组：
	
![](/images/posts/Java_Array_FingBigProduct/findhelp.jpg)

   好吧，我再改改（现在还没在意人家为什么用的long型而不是int型）  
	
### 修改代码
	
```
import java.util.Scanner;
public class Main{
    public static int getBig(int[] a){
        int min=a[0],max=a[0];
        int num=a.length;
        for(int i:a){
            if(i>max)
                max=i;
            if(i<min)
                min=i;
        }
        int n=max-min+1;
        int[] b=new int[n];
        for(int i=0;i<num;i++)
            b[a[i]-min]++;
        for(int i=0,j=0;i<n;i++){
            while(b[i]!=0){
                a[j++]=min+i;
                b[i]--;
            }
        }
        if(a[0]<0&&a[1]<0)
            return Math.max(a[0]*a[1]*max,a[num-1]*a[num-2]*a[num-3]);
        else
            return a[num-1]*a[num-2]*a[num-3];
    }
    public static void main(String[] args){
        /*Scanner scan=new Scanner(System.in);
        String S=scan.nextLine();
	String[] s=S.split(" ");
        String[] s=S.split(" ");
        int[] a=new int[s.length];
        for(int i=0;i<s.length;i++)
            a[i]=Integer.parseInt(s[i]);
        System.out.println(getBig(a));*/
        Scanner scan=new Scanner(System.in);
        int num=scan.nextInt();
        int[] a=new int[num];
        for(int i=0;i<num;i++) {
            a[i]=scan.nextInt();
        }
        System.out.println(getBig(a));
    }
}	
```

### 结果

这回肯定能过，但是：

![](/images/posts/Java_Array_FingBigProduct/result4.jpg)

惊了！突然意识到为什么要用long型了，马上改。  

### 三改代码

```
import java.util.Scanner;
public class Main{
     public static long getBig(long[] a){
        long min=a[0],max=a[0];
        int num=a.length;
        for(long i:a){
            if(i>max)
                max=i;
            if(i<min)
                min=i;
        }
        int n=Integer.parseInt(String.valueOf(max-min+1));
        long[] b=new long[n];
        for(int i=0;i<num;i++)
            b[Integer.parseInt(String.valueOf(a[i]-min))]++;
        for(int i=0,j=0;i<n;i++){
            while(b[i]!=0){
                a[j++]=min+i;
                b[i]--;
            }
        }
        /*if(a[0]<0&&a[1]<0)
            return Math.max(a[0]*a[1]*max,a[num-1]*a[num-2]*a[num-3]);
        else
            return a[num-1]*a[num-2]*a[num-3];*/
         return Math.max(a[0]*a[1]*max,a[num-1]*a[num-2]*a[num-3]);
    }
    public static void main(String[] args){
        /*Scanner scan=new Scanner(System.in);
        String S=scan.nextLine();
	String[] s=S.split(" ");
        int[] a=new int[s.length];
        for(int i=0;i<s.length;i++)
        	a[i]=Integer.parseInt(s[i]);
        System.out.println(getBig(a));*/
    	//System.out.println("INPUT THE NUMBER OF THE ARRAY:");
        Scanner scan=new Scanner(System.in);
        int num=scan.nextInt();
        long[] a=new long[num];
    	//System.out.println("INPUT THE ARRAY:");
        for(int i=0;i<num;i++) {
            a[i]=scan.nextInt();
        }
        System.out.println(getBig(a));
    }
}
```

### 等待许久的结果

![](/images/posts/Java_Array_FingBigProduct/result.jpg)


### 代码解释

我是**以我最满意的代码为例**解释一下代码内容，但**不太符合题目的要求**（题也有问题，并没有说先输入数组长度），主要是不需要规定数组长度。

```
package first;
import java.util.Scanner;
public class Main{
     public static long getBig(long[] a){
    	//对数组进行桶排序
        long min=a[0],max=a[0];
        int num=a.length;
        //寻找最大值、最小值
        for(long i:a){
            if(i>max)
                max=i;
            if(i<min)
                min=i;
        }
        //long型转换成int型
        //先把long型转换成String，再转换成int型，强制转换报错
        //n是桶的个数
        int n=Integer.parseInt(String.valueOf(max-min+1));
        long[] b=new long[n];
        //把a[i]出现的次数放到a[i]-min号桶内，如min放入到0号桶
        //这里条件是i<num，即以a[]为准，没有赋值的桶为默认值0，即
        //对应的数没有出现过
        for(int i=0;i<num;i++)
            b[Integer.parseInt(String.valueOf(a[i]-min))]++;
        //输出新的数组
        //i号桶的数就是与min相差i的数出现的次数，出现几次就输出几个min+i
        for(int i=0,j=0;i<n;i++){
            while(b[i]!=0){
            	//a[]中写入一个数，a[]的索引就加1，即去下一个a[]单元写入数据
                a[j++]=min+i;
                //写入一次，次数减1
                b[i]--;
            }
        }
         return Math.max(a[0]*a[1]*max,a[num-1]*a[num-2]*a[num-3]);
    }
    public static void main(String[] args){
        Scanner scan=new Scanner(System.in);
        String S=scan.nextLine();
        //以空格为分隔符，把输入的字符串分割成多个小部分
        String[] s=S.split(" ");
        long[] a=new long[s.length];
        //把分割得到的每个小部分String转换成long型
        for(int i=0;i<s.length;i++)
            a[i]=Long.parseLong(s[i]);
        System.out.println(getBig(a));
    }
}
```


<br/>
<br/>
转载请注明原地址:[KK's Blog](http://www.inankai.top)

