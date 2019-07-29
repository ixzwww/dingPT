export const  getDate = function(date) {
    if (date != 0) {
      var t = new Date(date* 1000);
      return t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();
    } else {
      return "暂无";
    }
  }
  export const getSeconds =  function(date) {
    if (date != 0) {
      var t = new Date(date * 1000);
      return (
        t.getFullYear() +
        "/" +
        (t.getMonth() + 1) +
        "/" +
        t.getDate() +
        " " +
        t.getHours() +
        ":" +
        t.getMinutes() +
        ":" +
        t.getSeconds()
      );
    } else {
      return "暂无";
    }
}
export const getFile = function(e) {
  let _this = this;
  var files = e.target.files[0];
  if (!e || !window.FileReader) return; // 看支持不支持FileReader
  let reader = new FileReader();
  reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
  reader.onloadend = function() {
    _this.src = this.result;
  };
}