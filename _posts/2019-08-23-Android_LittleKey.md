---
layout: post
title: Android经常使用的小知识点
date: 2019-08-23 
tag: Android 
---   

<br>

Android小知识点。


### 1.Activity间的数据传递  

#### 将UserActivity中点击的listView中的id信息传递到DetailActivity，则UserActivity.java中代码如下：

```
//listview中item的点击监听事件
        list1.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                //获得当前点击的item的文本内容
                String str1=listViewAdapter1.getItem(i).toString();
                //跳转页面
                Intent intent=new Intent(UserActivity.this,DetailActivity.class);
                //将点击位置的id信息传递到下一个页面，一个参数是为传递信息起的名称，一个参数是传递的值
                intent.putExtra("id",str1);
                Log.e("传值id",str1);
                startActivity(intent);
            }
        });

```  

#### 在DetailActivity.java中代码如下：  

```
//使用getStringExtra()方法获得字符串，还有类似的方法获得数值等。其中，方法的参数时为传递值的起的名称。
Intent i=getIntent();
Log.e("获得的id",""+i.getStringExtra("id"));
```

### 2.去掉标题栏  

#### 方法一：  

```
public class DetailActivity extends AppCompatActivity

//改成

public class DetailActivity extends Activity
```  

#### 方法二：  

```
@Override
protected void onCreate(Bundle savedInstanceState) {
    //去掉标题栏，一定要在setContentView前面
    this.requestWindowFeature(Window.FEATURE_NO_TITLE);
    if(getSupportActionBar()!=null){
        getSupportActionBar().hide();
    }
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
}
```  

#### 方法三：  

```
//在styles.xml文件中，将
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
//改成
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
```

<p> </p>  
  

转载请注明原地址:[KK's Blog](http://www.inankai.top)
