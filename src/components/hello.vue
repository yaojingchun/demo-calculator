<template>
  <div id="hello">
    <button @click="handleClick">click me</button>
    <table>
      <tr v-for="item in list.periodInfo">
        <td>{{"capital:"+item.capital}}</td>
        <td>{{"interest:"+item.interest}}</td>
        <td>{{"payAmount:"+item.payAmount}}</td>
        <td>{{"period:"+item.period}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'Hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        list:[]
      }
    },
    methods:{
      handleClick: function () {
        console.log("btn is clicked");
        var data={
          "loadAmount":1000,
          "period":10,
          "rate":5
        };
        this.$http.
        post('http://192.168.0.101:8080/Tomcat/compute/',data).
        then(function (response) {
          console.log(response);
          this.list=response.data;
        });
      }
    }
  }

</script>
