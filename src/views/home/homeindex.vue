<template>
    
</template>

<script>
    import Service from '../../common/service'
    import Util from '../../common/util'
    export default {
        name: "homeindex",
        beforeRouteEnter(to,from,next){
                if(Util.localStorageUtil.get('platform') && Util.localStorageUtil.get('customerNo') && Util.localStorageUtil.get('phone')){//app
                    if(to.query.hmCustomerNo && to.query.mobile && to.query.platform){
                        if(Util.localStorageUtil.get('customerNo') != to.query.hmCustomerNo){
                            Util.localStorageUtil.set('customerNo',to.query.hmCustomerNo);
                            Util.localStorageUtil.set('phone',to.query.mobile);
                            Util.localStorageUtil.set('platform',to.query.platform);
                        }
                    }
                    next({name: 'home',query: to.query,replace: true})
                }else{
                    if(to.query.hmCustomerNo && to.query.mobile && to.query.platform){
                        Util.localStorageUtil.set('customerNo',to.query.hmCustomerNo);
                        Util.localStorageUtil.set('phone',to.query.mobile);
                        Util.localStorageUtil.set('platform',to.query.platform);
                        next({name: 'home',query: to.query,replace: true})
                    }else{
                        if(to.query.timestamp && to.query.encode_string){
                            next({name: 'home',query: to.query,replace: true})
                        }else{
                            Service.login().loginout({}).then(response => {
                                if(response.errorCode == 0) {
                                    next({name: 'home',replace: true})
                                }
                            }, err => {
                            })
                        }
                    }
                }


        },
    }

</script>

<style scoped>

</style>