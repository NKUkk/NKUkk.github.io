---
layout: post
title: Android基础知识（二）——动态获得listView的高度
date: 2019-08-21 
tag: Android 
---   

<br>

  在Activity中使用listView时，若listView中的数据较多时，会把listView下面的控件挤没。因此为Activity添加滚动布局ScrollView，但是如果按照常规方法使用listView会造成listView只显示一行的高度。
 
 
## 在Activity中使用listView的方法

### Activity的xml文件  

```
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".DetailActivity">
    
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <ImageView
            android:id="@+id/detail_photo"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerHorizontal="true"
            android:layout_marginTop="50dp"
            android:src="@mipmap/user" />

        <LinearLayout
            android:id="@+id/detail"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/detail_photo"
            android:layout_marginTop="20dp">

            <ListView
                android:id="@+id/detaillist1"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="0.3"></ListView>

            <ListView
                android:id="@+id/detaillist2"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="0.7"></ListView>
        </LinearLayout>

        <Button
            android:id="@+id/detai_back"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/detail"
            android:layout_alignParentRight="true"
            android:layout_marginTop="20dp"
            android:layout_marginRight="5dp"
            android:background="#8a2be2"
            android:text="返回"
            android:textColor="#fffbf0" />

        <Button
            android:id="@+id/delete"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/detail"
            android:layout_marginLeft="5dp"
            android:layout_marginTop="20dp"
            android:background="#8a2be2"
            android:text="删除"
            android:textColor="#fffbf0" />

        <Button
            android:id="@+id/update"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/detail"
            android:layout_centerInParent="true"
            android:layout_marginTop="20dp"
            android:background="#8a2be2"
            android:text="修改"
            android:textColor="#fffbf0" />

    </RelativeLayout>
</ScrollView>
```

### 为listView创建适配器ListViewAdapter.java

```
package com.example.myapplication;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

/**
 * FileName：ListViewAdapter
 * Author：Peng
 * Date：2019/8/16  16:46
 */
public class ListViewAdapter extends BaseAdapter {
    private List<String> list;
    private Context context;

    public ListViewAdapter(List<String> ls, Context ctext) {
        super();
        this.list = ls;
        this.context = ctext;
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int i) {
        return list.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        view = LayoutInflater.from(context).inflate(R.layout.itemview, null);
        TextView tv = view.findViewById(R.id.tvinfo);
        tv.setText(list.get(i));
        return view;
    }



}

```  

### 创建listView的xml文件itemview.xml，用以规定listView中的显示格式

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/tvinfo"
        android:layout_width="match_parent"
        android:layout_height="60dp"
        android:textSize="25sp"
        android:gravity="center" />

</RelativeLayout>
```  

************************************************************************************
此时，可以在Activity页面上显示listView，若不是使用的滚动布局，则已成功使用listView。但由于Activity的xml文件使用的ScrollView布局，导致listView只能显示一行的宽度。   

************************************************************************************  

## 动态获得listView的高度
```
public class DetailActivity extends Activity {
    //定义两个listview变量
    private ListView listView1;
    private ListView listView2;

    //这里！这里！动态获得listView高度的方法，最后在onCreate()方法中调用实现即可。
    private void setListViewHeightBasedOnChildren(ListView listView) {
        // 获取ListView对应的Adapter
        ListAdapter listAdapter = listView.getAdapter();
        if (listAdapter == null) {
            return;
        }

        int totalHeight = 0;
        for (int i = 0, len = listAdapter.getCount(); i < len; i++) {
            // listAdapter.getCount()返回数据项的数目
            View listItem = listAdapter.getView(i, null, listView);
            // 计算子项View 的宽高
            listItem.measure(0, 0);
            // 统计所有子项的总高度
            totalHeight += listItem.getMeasuredHeight();
        }

        ViewGroup.LayoutParams params = listView.getLayoutParams();
        params.height = totalHeight+ (listView.getDividerHeight() * (listAdapter.getCount() - 1));
        // listView.getDividerHeight()获取子项间分隔符占用的高度
        // params.height最后得到整个ListView完整显示需要的高度
        listView.setLayoutParams(params);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        //连接数据库
        MySqliteHelper helper=new MySqliteHelper(DetailActivity.this);
        SQLiteDatabase db=helper.getReadableDatabase();
        //左侧listview绑定变量并且写死显示的值
        listView1=(ListView)findViewById(R.id.detaillist1);
        List<String> list=new ArrayList<>();
        list.add("学号");
        list.add("姓名");
        list.add("性别");
        list.add("年龄");
        list.add("生日");
        list.add("联系方式");
        list.add("家庭住址");

        //右侧listview绑定变量
        listView2=(ListView)findViewById(R.id.detaillist2);
        final List<String> list1=new ArrayList<>();
        //获得上一个页面传递过来的学号或姓名信息
        Intent i=getIntent();
        Log.e("获得的id",""+i.getStringExtra("id"));
        Intent n=getIntent();
        Log.e("获得的name",""+n.getStringExtra("name"));
        Cursor cursor;
        if(i.getStringExtra("id")!=null)
            cursor=db.rawQuery("select * from userinfo where id=?",new String[]{i.getStringExtra("id")});
        else
            cursor=db.rawQuery("select * from userinfo where name=?",new String[]{i.getStringExtra("name")});


        Log.e("行数",""+cursor.getCount());
        Log.e("列数",""+cursor.getColumnCount());
        //Cursor中的信息写入到右侧listview绑定的变量中
        String[] strings=cursor.getColumnNames();
        while(cursor.moveToNext()) {
            for(String str:strings){
                list1.add(cursor.getString(cursor.getColumnIndex(str)));
                Log.e(str,cursor.getString(cursor.getColumnIndex(str)));
            }
        }
        //listview显示数据
        ListViewAdapter listViewAdapter1=new ListViewAdapter(list,this);
        listView1.setAdapter(listViewAdapter1);
        setListViewHeightBasedOnChildren(listView1);
        ListViewAdapter listViewAdapter2=new ListViewAdapter(list1,this);
        listView2.setAdapter(listViewAdapter2);
        setListViewHeightBasedOnChildren(listView2);

        //返回按钮监听事件，返回到UserActivity
        final Button button=findViewById(R.id.detai_back);
        button.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()){
                    case MotionEvent.ACTION_DOWN:
                        button.setBackgroundColor(Color.parseColor("#ff0000"));
                        Intent intent=new Intent(DetailActivity.this,UserActivity.class);
                        startActivity(intent);
                        break;
                    case MotionEvent.ACTION_UP:
                        button.setBackgroundColor(Color.parseColor("#8a2be2"));
                        break;
                }
                return true;
            }
        });

        //为删除按钮添加监听事件
        final Button button1=findViewById(R.id.delete);
        button1.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()){
                    case MotionEvent.ACTION_DOWN:
                        button1.setBackgroundColor(Color.parseColor("#ff0000"));
                        AlertDialog.Builder builder=new AlertDialog.Builder(DetailActivity.this);
                        builder.setTitle("提示");
                        builder.setMessage("确定要删除学号为"+list1.get(0)+"，姓名为"+list1.get(1)+"的相关信息吗？");
                        builder.setNegativeButton("取消",null);
                        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                MySqliteHelper helper1=new MySqliteHelper(DetailActivity.this);
                                SQLiteDatabase db1=helper1.getWritableDatabase();

                                db1.execSQL("delete from userinfo where id=?",new String[]{list1.get(0)});
                                db1.close();
                                Toast.makeText(DetailActivity.this,"删除成功！",Toast.LENGTH_SHORT).show();
                                Intent intent=new Intent(DetailActivity.this,UserActivity.class);
                                startActivity(intent);
                            }
                        });
                        AlertDialog dialog=builder.create();
                        dialog.show();
                        break;
                    case MotionEvent.ACTION_UP:
                        button1.setBackgroundColor(Color.parseColor("#8a2be2"));
                        break;
                }
                return true;
            }
        });

        //为修改按钮添加监听事件
        final Button button2=findViewById(R.id.update);
        button2.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()){
                    case MotionEvent.ACTION_DOWN:
                        button2.setBackgroundColor(Color.parseColor("#ff0000"));
                        Intent intent=new Intent(DetailActivity.this,UpdateActivity.class);
                        intent.putExtra("update_id",list1.get(0));
                        startActivity(intent);
                        break;
                    case MotionEvent.ACTION_UP:
                        button2.setBackgroundColor(Color.parseColor("#8a2be2"));
                        break;
                }
                return true;
            }
        });
    }
}
```


<p> </p>  
  
转载请注明原地址:[KK's Blog](http://www.inankai.top)
