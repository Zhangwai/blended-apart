import React from "react";
import { View, Text, Button } from "@tarojs/components";
import { connect } from "react-redux";
import { addNum } from "@/store/actions/count";
import Taro from "@tarojs/taro";
import "./index.scss";

const Index = (props) => {
  const { count, addNum } = props;
  const handleClickToSub = () => {
    Taro.navigateTo({ url: "/pages/sub/index" });
  };
  return (
    <View className="red index">
      <Text>Hello world!(主页面)</Text>
      <View
        style={
          "width: 100%; margin: 20px 0; color:green; textAlign: center; background: rgba(0,0,0,0.1)"
        }
      >
        {count}
      </View>
      <Button onClick={() => addNum(1)}>+1</Button>
      <Button onClick={handleClickToSub}>跳转sub</Button>
    </View>
  );
};

const mapStateToProps = (state) => ({ count: state.count });
const mapDispatchToProps = (dispatch) => ({
  addNum: (num) => {
    dispatch(addNum(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
