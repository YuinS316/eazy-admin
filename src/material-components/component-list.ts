//  公共样式
const commonStyle = {
  opacity: 1,
  rotate: 0
};

//  公共属性
const commonAttr = {
  //  是否锁定
  isLock: false
};

//  默认配置列表
const list = [
  {
    component: "EzButton",
    label: "按钮",
    propValue: "按钮",
    icon: "button",
    style: {
      left: 0,
      top: 0,
      width: 100,
      height: 34,
      borderWidth: 1,
      borderColor: "#fff",
      borderRadius: 0,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 0,
      letterSpacing: 0,
      textAlign: "center",
      color: "#000",
      backgroundColor: "#fff"
    }
  }
];

function buildList(source: typeof list) {
  for (let i = 0; i < source.length; i++) {
    let item = source[i];
    item.style = {
      ...commonStyle,
      ...item.style
    };
    source[i] = { ...commonAttr, ...item };
  }
}

buildList(list);

export default list;
