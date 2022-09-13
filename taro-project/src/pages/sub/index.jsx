import React, { useState } from "react";
import { View, Text, Button, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { addNum, resetNum } from "@/store/actions/count";
import "./index.scss";

const Index = (props) => {
  const { count, addNum, resetNum } = props;
  const [state, setState] = useState(count);
  const handleClickToMain = () => {
    Taro.navigateTo({ url: "/pages/index/index" });
  };
  const handleResetNum = () => {
    resetNum(state);
  };
  return (
    <View className="red index">
      <Text>Hello sub!</Text>
      <View
        style={
          "width: 100%; margin: 20px 0; color:green; textAlign: center; background: rgba(0,0,0,0.1)"
        }
      >
        {count}
      </View>
      <Button onClick={() => addNum(1)}>+1</Button>
      <Input
        type="number"
        placeholder="请输入数字"
        style={
          "width: 100%; height: 100px; margin: 20px 0; color:green; textAlign: center; background: rgba(66,33,55,0.1)"
        }
        onInput={(e) => {
          setState(Number(e.detail.value));
        }}
      />
      <Button onClick={handleResetNum}>reset</Button>
      <Button onClick={handleClickToMain}>跳转主页面</Button>
    </View>
  );
};

const mapStateToProps = (state) => ({ count: state.count });
const mapDispatchToProps = (dispatch) => ({
  addNum: (num) => {
    dispatch(addNum(num));
  },
  resetNum: (num) => {
    dispatch(resetNum(num));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
