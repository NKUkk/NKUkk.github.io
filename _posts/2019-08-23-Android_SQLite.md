---
layout: post
title: Android基础知识（一）——SQLite数据库连接与使用
date: 2019-08-23 
tag: Android 
---   

<br>

  Android连接SQLite数据库并实现表的创建与数据的增删改查。
 
 
### 创建MySqliteHelper类

```
public class MySqliteHelper extends SQLiteOpenHelper {
    public MySqliteHelper(Context context){
	//user.db数据库名称
        super((Context) context,"user.db",null,3);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
		
	//创建表
        sqLiteDatabase.execSQL("Create table if not exists user(username String primary key,password String)");
        sqLiteDatabase.execSQL("Create table if not exists userinfo(id String primary key,name String," +
                "sex String,age String,date String,phonenum String,address String)");
		
	//cursor是行集合，用于存储查询获得的结果，cursor后只可用rawQuery()，不可以execSQL()
        Cursor c=sqLiteDatabase.rawQuery("select * from user where username=?",new String[]{"admin"});
        
	//查询结果的数量
	if(c.getCount()==0) {
            sqLiteDatabase.execSQL("insert into user values('admin','123456')");
        }
    }
    
    //重写onUpgrade方法
    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}
```

### 在MainActivity.java中连接数据库

```
public class MainActivity extends AppCompatActivity{
    //定义编辑框变量
    private EditText editText1;
    private EditText editText2;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
	//去掉标题栏
	//方法一：将上面的AppCompatActivity改成Activity
	//方法二：
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        if(getSupportActionBar()!=null){
            getSupportActionBar().hide();
        }

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        //连接数据库
        final MySqliteHelper helper = new MySqliteHelper(MainActivity.this);
        final SQLiteDatabase db = helper.getReadableDatabase();
        helper.onCreate(db);

        //绑定编辑框与其变量
        editText1 = findViewById(R.id.username);
        editText2 = findViewById(R.id.userpassword);

        //登录按钮监听事件
        final Button button1 = (Button) findViewById(R.id.signin);
        button1.setOnTouchListener(new View.OnTouchListener() {

            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()) {
		    //按钮被按下
                    case MotionEvent.ACTION_DOWN:
                        button1.setBackgroundColor(Color.parseColor("#ff0000"));
                        //判断数据库是否打开
                        if (db.isOpen())
                            Log.e("数据库状态", "OPEN");
                        else
                            Log.e("数据库状态", "CLOSE");

			//查询数据库中是否有输入的用户名和密码
                        Cursor c = db.rawQuery("select * from user where username=? and password=?",
                                new String[]{editText1.getText().toString(),editText2.getText().toString()});

                        //日志输出判断获取值情况
                        Log.e("用户名输入", editText1.getText().toString());
                        Log.e("密码输入", editText2.getText().toString());
                        Log.e("筛选结果是否为空",""+(c==null));
                        Log.e("数据库筛选结果数目", "" + c.getCount());
                        
			//判断查询中是否有记录
                        if (c != null && c.getCount() >= 1) {
                            //跳转到用户界面
                            Intent intent = new Intent(MainActivity.this, UserActivity.class);
                            startActivity(intent);
                            c.close();
                            db.close();
                            helper.close();
                        } else {
                            Toast.makeText(MainActivity.this, "账号或密码错误！", Toast.LENGTH_SHORT).show();
                        }
                        break;
		    //按钮没有被按下
                    case MotionEvent.ACTION_UP:
                        button1.setBackgroundColor(Color.parseColor("#8a2be2"));
                        break;
                }
                return true;
            }
        });

        //注册按钮监听事件
        final Button button2 = (Button) findViewById(R.id.signup);
        button2.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        button2.setBackgroundColor(Color.parseColor("#ff0000"));
                        //跳转到注册界面
                        Intent intent = new Intent(MainActivity.this, SignupActivity.class);
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
