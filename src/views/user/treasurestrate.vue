<style lang="scss" scoped>
    $baseFontSize: 75;
    .personrule {
        width: 100%;
        height: 325rem/$baseFontSize;
        background: url("../../assets/image/gerenzhongxin_beijing.png") no-repeat center center;
        background-size: 100% 100%;
        /*background-size: cover;*/
        color: #fff;
        position: relative;
        .ruleContent {
            position: absolute;
            top: 0;
            background: #fff;
            margin: 122rem/$baseFontSize 40rem/$baseFontSize;
            border-radius: 10px;
            padding: 35rem/$baseFontSize 28rem/$baseFontSize;
            box-shadow: 0px 10px 31px 6px rgba(209, 209, 209, 0.25);
            .title {
                color: #3d3d3d;
                font-size: 30rem/$baseFontSize;
                position: relative;
                line-height: 60rem/$baseFontSize;
                font-weight: 600;
            }
            .title:before {
                position: absolute;
                content: '';
                display: inline-block;
                height: 22rem/$baseFontSize;
                width: 16rem/$baseFontSize;
                border-radius: 0 3px 3px 0;
                background: #0abf9b;
                left: -28rem/$baseFontSize;
                top: 19rem/$baseFontSize;
            }
            .content {
                color: #3d3d3d;
                font-size: 24rem/$baseFontSize;
                line-height: 60rem/$baseFontSize;
                .tableBox {
                    padding: 15rem/$baseFontSize 0;
                    .ruleTable {
                        width: 100%;
                        border-collapse: separate;
                        border-spacing: 0;
                        border: 2px #000;
                        text-align: center;
                        line-height: 60rem/$baseFontSize;
                        font-size: 24rem/$baseFontSize;
                    }
                    table tr th, table tr td {
                        border-left: 1px solid #d2d2d2;
                    }
                    table tr th:last-child, table tr td:last-child { /*设置table右边边框*/
                        border-right: 1px solid #d2d2d2;
                    }
                    table tr td { /*设置table表格每列底部边框*/
                        border-bottom: 1px solid #d2d2d2;
                    }
                    table tr th {
                        background: #dcdcdc;
                        text-align: center;
                    }
                    table tr:first-child th:first-child {
                        border-top-left-radius: 10px;
                    }

                    table tr:first-child th:last-child {
                        border-top-right-radius: 10px;
                    }
                    table tr:last-child td:first-child {
                        border-bottom-left-radius: 10px;
                    }

                    table tr:last-child td:last-child {
                        border-bottom-right-radius: 10px;
                    }
                }
            }
        }
    }
</style>
<template>
    <div>
        <div class="personrule">
            <div class="ruleContent">
                <div class="title">1.会员等级介绍</div>
                <div class="content">分享家每一位会员都可通过会员体系享受相应权益。
                    分享家会员体系共V0-V5六个等级，会员等级由云值
                </div>
                <div class="title">2.等级有效期</div>
                <div class="content">
                    等级生效后维持三个月，三个月内享受应有会员权益，不会降级。
                </div>
                <div class="title">3.会员等级对应云值</div>
                <div class="content">
                    <div class="tableBox">
                        <table class="ruleTable" cellspacing="0" cellpadding="0">
                            <tr>
                                <th>会员等级</th>
                                <th>会员等级名称</th>
                                <th>XX值标准</th>
                            </tr>
                            <tr>
                                <td>V0</td>
                                <td>普通会员</td>
                                <td>0-499</td>
                            </tr>
                            <tr>
                                <td>V0</td>
                                <td>普通会员</td>
                                <td>0-499</td>
                            </tr>
                            <tr>
                                <td>V0</td>
                                <td>普通会员</td>
                                <td>0-499</td>
                            </tr>
                        </table>
                    </div>

                </div>
                <div class="title">4.升降级规则</div>
                <div class="content">在三个月有效期内， 若当月达到更高等级所需云值，次月即可正式升级； 若至少一个月达到目前等级所需云值，第四个月起仍维持本级；
                    若连续三个月都未达到目前等级所需云值，则以这三个月单月最高云值确定等级，第四个月降至该等级
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "treasurestrate",
        data() {
            return {}
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '享宝攻略'
        },
    }
</script>


