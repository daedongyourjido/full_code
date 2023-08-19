module.exports = {
  presets: [
    "@babel/preset-react", // React 관련 변환을 위한 preset
    "@babel/preset-env", // 최신 JavaScript 문법을 브라우저 호환성에 맞게 변환하기 위한 preset
  ],
  plugins: [
    "@babel/plugin-proposal-private-property-in-object",
    // 다른 플러그인 또는 설정도 여기에 추가할 수 있습니다.
  ],
};
