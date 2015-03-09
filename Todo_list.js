//読み込み完了時に実行する関数を指定
$(loaded);

/**
 *ロード時の読み込関数
**/
function loaded(){
  //ボタンタグをクリックしたときの動作を指定
 showLocalStorage();
  $("#title").val("test");
  $("#urgency").val("1");
  $("#date").val(getNowDate());
  $("#memo").val("memo"); 
}

/**
 *現在の年月日の文字列を得る
 *return yyyy-mm-ddの形式で文字列を返す
**/
function getNowDate(){
	var now = new Date();
	var nowDate=now.getFullYear();
	
	if(now.getMonth() < 10){
		nowDate = nowDate+"-0"+(now.getMonth()+1);	
	}else{
		nowDate = nowDate+"-"+(now.getMonth()+1);
		
	}
	
	if(now.getDate() < 10){
		nowDate = nowDate+"-0"+(now.getDate());
		
	}else{
		nowDate = nowDate+"-"+now.getDate();
	}
	
	return nowDate;
}

/**
 *ローカルストレージ内のToDoを読みだす
**/
function showLocalStorage(){
	var len = localStorage.length;
	var i;
	for(i=0;i<len;i++){
		addToDoList(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}
}

/**
 *入力フォームの情報を取得する
 *@return 入力情報の文字列配列
**/
function getTask() {
  var data = new Array(document.getElementById("title").value,
  document.getElementById("date").value,
  document.getElementById("urgency").value,
  document.getElementById("memo").value);
  
  return data;
}

/**
 *入力フォームのsubmitボタンを押したときのコールバック関数
 *タイトルが同じＴｏＤｏははじきます
**/
function crateTask() {
	//フォームから情報帆取得
  var texts = getTask();
  // $("#debug").text(JSON.stringify(texts));
   
   if(chackToDo(texts)){
	   //ローカルストレージに保存
	   saveStorageToDo(texts);
		 // $("#debug").text(JSON.stringify(texts));
	  //一覧表に追加
	  addToDoList(texts);
	  
	  resetForm();
   }
}

/**
 *ToDoListにgetTask()から得た文字列を追加する
 * @param _texts getTask()から得た文字列
**/
function addToDoList(_texts){
  $("#todo_table tbody").eq(0).after(htmlTableRowf(_texts));
}

/**
 *getTask()から得た文字列（タイトル）がすでに登録されているモノかどうか判断する
 * @param _texts getTask()から得た文字列
 * @return 登録されていないならtrueを返す
**/
function chackToDo(_texts){
  // 文字数が0または20以上は不可
  if (0 === _texts[0].length || 20 < _texts[0].length) {
    alert("タイトル文字数は1〜20字にしてください");
    return false;
  }
  if(localStorage.getItem(_texts[0]) != null){
      alert("同じタイトルは避けてください");
	return false;  
  }
    if (80 < _texts[3].length) {
    alert("メモは80字にしてください");
    return false;
  }
	return true;
}

/**
 * getTask()から得た文字列をＨＴＭＬの形式で表示する　
 * @param _texts getTask()から得た文字列
 * @return htmlの表形式の一列（<tr></tr>）の形式の文字列
**/
function htmlTableRowf(_texts){
	var i;
	var html_text ='<tr id="'+_texts[0]+'">'
	for(i=0;i<_texts.length;i++){
		html_text = html_text+"<td>"+_texts[i]+"</td>";
	}
	html_text = html_text+'<td>'
	                     +'<button '
						 +'type="button" '
						 +'onClick="deleteStorage('
						 +"'"
						 +_texts[0]
						 +"'"
						 +')"'
						 +'>'
						 +'delete'
						 +'</button>'
						 +'</td>';
	html_text = html_text+"</tr>";
	return html_text;
}


/**
 *getTask()から得た文字列をlocalStorageに保存する
 * @param _texts getTask()から得た文字列
**/
function saveStorageToDo(_texts){
	localStorage.setItem(_texts[0],JSON.stringify(_texts));	
}

/**
 *localStorageとToDoListから特定のrowを消す
 *@param _key 削除するKey
**/
function deleteStorage(_key){
	
	localStorage.removeItem(_key);
	$("#"+_key).remove();	
}

/**
 *入力フォームの値のリセット
**/
function resetForm(){
  $("#title").val("");
  $("#urgency").val("1");
  $("#date").val(getNowDate());
  $("#memo").val("");	
}
