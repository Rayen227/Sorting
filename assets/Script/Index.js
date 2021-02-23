
cc.Class({
    extends: cc.Component,

    properties: {
        wxSubContextView: cc.Node,
        onePagePrefab: cc.Prefab,
        startbtn:cc.Node,
        showbanksbtn:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initUserInfoButton();
        this.startbtn.active = false
        this.wxSubContextView.active = false
        var onePage = cc.instantiate(this.onePagePrefab);
        onePage.getComponent("OnePage").rendering(0);
    },

    startGame(){
        cc.director.loadScene("MainView");
    },

    initUserInfoButton() {
        const _this = this
        // 微信授权，此代码来自Cocos官方
        if (typeof wx === 'undefined') {
            return;
        }

        let systemInfo = wx.getSystemInfoSync();
        let width = systemInfo.windowWidth;
        let height = systemInfo.windowHeight;
        let button = wx.createUserInfoButton({
            type: 'text',
            text:'点击授权',
            style: {
                left: 50,
                top: 300,
                width: 200,
                height: 50,
                lineHeight: 40,
                backgroundColor: '#00FF00',
                color: '#FFFFFF ',
                textAlign: 'center',
                fontSize: 15,
                borderRadius: 4
            }
        });

        button.onTap((res) => {
            if (res.userInfo) {
                // 可以在这里获取当前玩家的个人信息，如头像、微信名等。
                console.log('授权成功！');
                _this.startbtn.active = true
                // setTimeout(function () {
                //     cc.director.loadScene("MainView");
                //   }, 1000);
            }
            else {
                console.log('授权失败！');
            }
            button.hide();
            button.destroy();
        });
    },
    //弹出排行榜函数
    showRanks() {
        if (typeof wx === 'undefined') {
            console.log('showRanks')
            return;
        }
        if (!this.wxSubContextView.active) {
            // 设置容器可见
            this.wxSubContextView.active = true;
            // 设置随机数(把这个当做玩家每局结算时的分数)
            //let score = Math.round(Math.random()*10);
            let score = 0
            console.log(score);
            // 发送结算分数到开放域
            wx.getOpenDataContext().postMessage({
                message: score
            });
        }
        else {
            // 设置容器不可见，即关闭排行榜，并让开放域清空排名信息
            this.wxSubContextView.active = false;
            wx.getOpenDataContext().postMessage({
                message: 'clear'
            });
        }
    },
    start() {

    },

    // update (dt) {},
});
