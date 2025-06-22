const defaultLocale = {
  floatLeft: "左",
  floatRight: "右",
  center: "真ん中",
  restore: "リセット",
  altTip: "Altキーを押し続けて比率を固定！",
  inputTip: "Enterキーを押して変更を適用！",
};
class I18n {
  config;
  constructor(config) {
    this.config = { ...defaultLocale, ...config };
  }

  findLabel(key) {
    return Reflect.get(this.config, key);
  }
}

export { defaultLocale, I18n };
