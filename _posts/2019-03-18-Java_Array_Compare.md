---
layout: post
title: 拼多多—数组比较
date: 2019-03-18 
tag: Java 
---   

<br>

 
 
### 题目

六一儿童节，老师带了很多好吃的巧克力到幼儿园。每块巧克力j的重量为w[j]，对于每个小朋友i，当他分到的巧克力大小达到h[i] (即w[j]>=h[i])，他才会上去表演节目。
老师的目标是将巧克力分发给孩子们，使得最多的小孩上台表演。可以保证每个w[i]> 0且不能将多块巧克力分给一个孩子或将一块分给多个孩子。


### 分析         

把两个数组从小到大排序，用巧克力数组中最小的去和学生数组里的数字比较。如果巧克力数组中的最小值比学生数组的最小值小，则巧克力数组取下一个数字比较；如果巧
克力数组的最小值比学生数组的最小值大，则表演学生数量加一，巧克力数组和学生数组均取下一个数进行比较，直到巧克力数组或学生数组达到最后一个数。

### 代码   
```
import java.util.Scanner;
import java.util.Arrays;
public class Main{
    public static int getNumber(int a[],int b[]){
        int number=0;
        for(int i=0,j=0;i<b.length;i++){
            if(b[i]<a[j])
                continue;
            else{
                number++;
                j++;
                if(j==a.length)
                    break;
            }
        }
        return number;
    }
    public static void main(String[] args){
        Scanner scan=new Scanner(System.in);
        //学生数组
        int n=scan.nextInt();
        int h[]=new int[n];
        for(int i=0;i<n;i++)
            h[i]=scan.nextInt();
        //巧克力数组
        int m=scan.nextInt();
        int w[]=new int[m];
        for(int i=0;i<m;i++)
            w[i]=scan.nextInt();
        //排序
        Arrays.sort(h);
        Arrays.sort(w);
		//输出
        System.out.println(getNumber(h,w));
    }
}
```



### 知识点

**Java的Arrays类的sort()方法**  

1.Arrays.sort(int[] a)  
对数组的所有元素进行排序，并且是由小到大的顺序

2.Arrays.sort(int[] a, int formIndex,int toIndex)  
对数组的部分元素进行排序，也就是对数组a的下标从fromIndex到toIndex-1的元素进行排序，**注：下标为toIndex的元素不参与排序**


<br\>
<br\>
转载请注明原地址:[KK's Blog](http://www.inankai.top)

