<template>
  <div class="calculator">
    <h1>calculator</h1>
    <div class="set">
      <h3>借款设置</h3>
      <ul>
        <li>借款金额：<input type="number" id="sum" v-model="sum"></li>
        <li>年化利率：<input type="number" id="rate" v-model="rate">%</li>
        <li>借款期数：<input type="number" id="periods" v-model="periods"></li>
        <li>还款方式：按月偿还</li>
      </ul>
      <button @click="getResult">开始计算</button>
    </div>
    <div class="summary" v-if="summary">
      <h3>贷款概述</h3>
      <table>
        <tr>
          <td>每个月将偿还：</td>
          <td>{{mrepay}}</td>
          <td>您将在{{periods}}个月后还清贷款</td>
        </tr>
        <tr>
          <td>月利率：</td>
          <td>{{mrate}}%</td>
          <td>您还清贷款总共要还{{resum}}元(小于0.01元无法计算，可能会有误差)</td>
        </tr>
      </table>
    </div>
    <div class="schedule">
      <h3>偿还的时间表</h3>
      <table>
        <thead>
          <td>月份</td>
          <td>月偿还</td>
          <td>月本金还款</td>
          <td>利息</td>
          <td>余额</td>
        </thead>
        <tbody>
          <tr v-for="tmp in arr">
            <td>{{tmp.month}}</td>
            <td>{{tmp.mrepay}}</td>
            <td>{{tmp.mben}}</td>
            <td>{{tmp.accrual}}</td>
            <td>{{tmp.yue}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data () {
    return {
      sum: '',
      rate:'',
      periods:'',
      summary:false,
      mrepay:'',

      resum:'',
      accrual:'',
      arr:[]
    }
  },
  computed: {
    mrate: function () {
      return (this.rate / this.periods).toFixed(2);
    }
  },
  methods:{
    getResult:function () {
      if(this.sum!=''&&this.rate!=''&&this.periods!=''){
        var arr1=[];
        this.summary=true;
        this.resum=this.sum * this.mrate*0.01 * this.periods * Math.pow( 1 + this.mrate*0.01,this.periods)/( Math.pow( 1 + this.mrate*0.01,this.periods) - 1);
        this.resum=this.resum.toFixed(2);
        this.mrepay=(this.resum/this.periods).toFixed(2);

        var payed=0;
        var yue=this.sum;

        for(var i=0;i<this.periods;i++){
          this.accrual=((this.sum-Number(payed))*this.mrate*0.01).toFixed(2);
//          console.log(this.accrual);
          payed=(Number(payed)+Number(this.mrepay)-Number(this.accrual)).toFixed(2);
//          console.log(payed);
          yue=(this.sum-payed).toFixed(2);
          if(i==this.periods-1){
            yue=0;
          }
          var data={"month":i+1,"mrepay":this.mrepay,"mben":(this.mrepay-this.accrual).toFixed(2),"accrual":this.accrual,"yue":yue};
//          console.log(data);
          arr1.push(data);
        }
//        console.log(this.arr);
        this.arr=arr1;
      }else{
        alert("请输入正确的金额，年化利率及期数");
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
    border:1px solid #ddd;
    width:90%;
    margin: 0 auto;
  }
  h3{
    text-align: left;
    margin-left: 6%;
  }
  div.calculator{
    border:none;
  }
 .set ul{
   list-style: none;
   text-align: left;
 }
  .summary table td:first-child{
    width:25%;
  }
  .summary table td:last-child{
    width:55%;
  }
  .schedule table{
    width:100%;
  }
  .schedule table td{
    width:20%;
  }
</style>
