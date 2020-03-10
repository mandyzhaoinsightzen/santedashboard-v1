<template>
  <div class="patient-container">
    <div class="pt-total clear">
      <div class="title-content">
        <h2 class="title-size-h2">{{$t("homecontent.patientstats")}}</h2>
      </div>
      <div class="align-right margin-right30">
        <span class="pt-title">{{$t("homecontent.totalnumberpt")}}</span>
        <span class="title-size margin-left10 margin-right50">345345345</span>
        <span class="pt-title">{{$t("homecontent.totalnumberast")}}</span>
        <span class="title-size margin-left10">23423</span>
      </div>
    </div>
    <div class="line-st">
      <p class="line"></p>
    </div>
    <h3 class="title-size">{{$t("homecontent.regionaldistribution")}}</h3>
    <div id="regional-dist"  class="worldchart-w-h"> 
      <!-- <worldChart></worldChart> -->
    </div>
    <h3 class="title-size">{{$t("homecontent.patientdistribution")}}</h3>
    <div class="pie-main">
      <div class="pie-region">
        <h4>{{$t("homecontent.assessmentdistribtn")}}</h4>
        <div id="assessemt-pie-chart" class="chart-w-h"></div>
      </div>
      <div class="pie-region">
        <h4>{{$t("homecontent.genderdistribtn")}}</h4>
        <div id="gender-pie-chart" class="chart-w-h"></div>
      </div>
      <div class="pie-region">
        <h4>{{$t("homecontent.agedistribtn")}}</h4>
        <div id="age-pie-chart" class="chart-w-h"></div>
      </div>
    </div>
    <div class="line-st">
      <p class="line"></p>
    </div>
    <h3 class="title-size">{{$t("homecontent.scoredistribution")}}</h3>
    <div class="score-dist pie-main">
      <div class="pie-region-two">
        <h4>{{$t("homecontent.generalhealth")}}</h4>
        <div id="risk-chart" class="chart-w-h"></div>
      </div>
      <div class="pie-region-two">
        <!-- <h4>{{$t("homecontent.digestion")}}</h4> -->
        <div class="charts">
          <digestionChart :id="digestionId" :option="digestionOption" class="chart-3d-w-h"></digestionChart>
        </div>
      </div>
    </div>
    <div class="score-dist pie-main">
      <div class="pie-region-two">
        <h4>{{$t("homecontent.mental")}}</h4>
        <div id="mental-chart" class="chart-w-h"></div>
      </div>
      <div class="pie-region-two">
        <!-- <h4>{{$t("homecontent.sleep")}}</h4> -->
        <!-- <div id="sleep-chart"  class="chart-w-h"></div> -->
        <digestionChart :id="sleepId" :option="sleepOption" class="chart-w-h"></digestionChart>
      </div>
    </div>
    <div class="all-patients">
      <div class="paddingtopbottm20">
        <patientList></patientList>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import '../../node_modules/echarts/map/js/world.js'
import HighCharts from "highcharts";
//import { getChartData ,getLineYMdData} from "./../api/api";
import patientList from "@/components/patientList";
import digestionChart from "../components/digestionChart.vue";
export default {
  components: { patientList, digestionChart },
  data() {
    return {
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null,
      allPatientsNumber: 0,
      allPatientsAssessments: 0,
      formatData: [],
      digestionId: "Digestion",
      digestionOption: {
        chart: {
          type: "pie", //饼图
          options3d: {
            enabled: true, //使用3d功能
            alpha: 60, //延y轴向内的倾斜角度
            beta: 0
          }
        },
        title: {
          text: "Digestion" //图表的标题文字
        },
        subtitle: {
          text: "" //副标题文字
        },
        // colors: ['#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        colors: ["#3869c2", "#f07725"],
        credits: {
          enabled: false
        }, //去掉地址
        plotOptions: {
          pie: {
            allowPointSelect: true, //每个扇块能否选中
            cursor: "pointer", //鼠标指针
            depth: 35, //饼图的厚度
            dataLabels: {
              enabled: true //是否显示饼图的线形tip
            }
          }
        },
        series: [
          {
            type: "pie",
            name: "", //统一的前置词,非必须
            data: [
              ["Health", 12], //模块名和所占比，也可以{name: '测试1',y: 12}
              ["UnHealth", 24]
            ]
          }
        ]
      },
      sleepId: "Sleep",
      sleepOption: {
        chart: {
          type: "column",
          margin: 75,
          options3d: {
            enabled: true,
            alpha: 35,
            beta: -10,
            depth: 0
          }
        },
        title: {
          text: "Sleep" //图表的标题文字
        },
        subtitle: {
          text: "" //副标题文字
        },
        credits: {
          enabled: false
        }, //去掉地址
        xAxis: {
          categories: ["Low", "Medium", "High", "Severe"],
          crosshair: true,
          labels: {
            // formatter: function() {
            //     var labelVal = this.value;
            //     var reallyVal = '';
            //     var lvl = labelVal.length;
            //     if(lvl > 1){
            //         for(var i=1;i<=lvl;i++){
            //             reallyVal += labelVal.substr(i-1,1)+"<br/>";
            //         }
            //     }
            //     return reallyVal.substring(0,reallyVal.length-5);
            // }
          }
        },
        yAxis: {
          title: {
            text: null
          }
        },
        plotOptions: {
          column: {
            depth: 35
          },
          series: {}
        },
        series: [
          {
            name: "Severe",
            data: [5]
          },
          {
            name: "High",
            data: [3]
          },
          {
            name: "Moderate",
            data: [2]
          },
          {
            name: "Low",
            data: [3]
          }
        ]
      }
    };
  },
  mounted() {
    //钩子函数挂载时实例化这个图表
    // chart(参数1,参数2);第一个参数挂载组件的容器，第二个参数为图表所需要的数据对象
    HighCharts.chart(this.id, this.dataObj);
  },
  methods: {
    percentageCalculate(number, total) {
      return parseInt(Math.round((number / total) * 10000) / 100);
    },
    drawGenderChart(data) {
      this.chPie = echarts.init(document.getElementById("gender-pie-chart"));
      var nameData = ["Males", "Females"];
      var option = {
        animation: true,
        title: {
          x: "center",
          y: "center",
          textStyle: {
            color: "red",
            fontSize: 60,
            fontWeight: "normal",
            align: "center",
            width: "200px"
          },
          subtextStyle: {
            color: "red",
            fontSize: 20,
            fontWeight: "normal",
            align: "center"
          }
        },
        legend: {
          width: "50%",
          left: "center",
          textStyle: {
            color: "#9B9B9B",
            fontSize: 16
          },
          icon: "circle",
          right: "0",
          bottom: "0",
          top: "75%",
          itemGap: 20,
          data: nameData
        },
        series: [
          {
            type: "pie",
            center: ["50%", "35%"],
            radius: ["30%", "40%"],
            color: ["#3A86D9", "#DD0C75"],
            startAngle: 135,
            labelLine: {
              normal: {
                length: 25
              }
            },
            label: {
              normal: {
                // formatter: "{c}\n{d}%",
                formatter: "\n{d}%",
                backgroundColor: "rgba(255, 147, 38, 0)",
                borderColor: "transparent",
                borderRadius: 4,
                textStyle: {
                  color: "#4a4a4a",
                  fontSize: 16
                }
              }
            },
            // data: data
            data: [
              { value: 32, name: "Males" },
              { value: 23, name: "Females" }
            ]
          }
        ]
      };
      this.chPie.setOption(option);
    },
    drawAgeChart(data1) {
      var agePie = echarts.init(document.getElementById("age-pie-chart"));
      var nameData = ["Under 20", "20-40", "40-60", "Above 60"];
      var option = {
        animation: true,
        title: {
          x: "center",
          y: "center",
          textStyle: {
            color: "red",
            fontSize: 60,
            fontWeight: "normal",
            align: "center",
            width: "200px"
          },
          subtextStyle: {
            color: "red",
            fontSize: 20,
            fontWeight: "normal",
            align: "center"
          }
        },
        legend: {
          width: "70%",
          left: "center",
          textStyle: {
            color: "#9B9B9B",
            fontSize: 16
          },
          icon: "circle",
          right: "0",
          bottom: "0",
          top: "75%",
          itemGap: 30,
          data: nameData
        },
        series: [
          {
            type: "pie",
            center: ["50%", "32%"],
            radius: ["30%", "40%"],
            color: ["#999DC5", "#8EC3B8", "#E19A4F", "#2F4186"],
            startAngle: 135,
            labelLine: {
              normal: {
                length: 25
              }
            },
            label: {
              normal: {
                formatter: "\n{d}%",
                backgroundColor: "rgba(255, 147, 38, 0)",
                borderColor: "transparent",
                borderRadius: 4,
                textStyle: {
                  color: "#4a4a4a",
                  fontSize: 16
                }
              }
            },
            // data: data1
            data: [
              { value: 32, name: "Under 20" },
              { value: 23, name: "20-40" },
              { value: 75, name: "40-60" },
              { value: 91, name: "Above 60" }
            ]
          }
        ]
      };
      agePie.setOption(option);
    },
    drawAssChart(data1) {
      var assessemtChart = echarts.init(
        document.getElementById("assessemt-pie-chart")
      );
      var nameData = ["Health Assessment", "Stress Assessment"];
      var option = {
        animation: true,
        title: {
          x: "center",
          y: "center",
          textStyle: {
            color: "red",
            fontSize: 60,
            fontWeight: "normal",
            align: "center",
            width: "200px"
          },
          subtextStyle: {
            color: "red",
            fontSize: 20,
            fontWeight: "normal",
            align: "center"
          }
        },
        legend: {
          width: "70%",
          left: "center",
          textStyle: {
            color: "#9B9B9B",
            fontSize: 16
          },
          icon: "circle",
          right: "0",
          bottom: "0",
          top: "75%",
          itemGap: 30,
          data: nameData
        },
        series: [
          {
            type: "pie",
            center: ["50%", "35%"],
            radius: ["30%", "40%"],
            color: ["#007AFF", "#F5A523"],
            startAngle: 135,
            labelLine: {
              normal: {
                length: 25
              }
            },
            label: {
              normal: {
                formatter: "\n{d}%",
                backgroundColor: "rgba(255, 147, 38, 0)",
                borderColor: "transparent",
                borderRadius: 4,
                textStyle: {
                  color: "#4a4a4a",
                  fontSize: 16
                }
              }
            },
            //data: data1
            data: [
              { value: 32, name: "" },
              { value: 23, name: "" }
            ]
          }
        ]
      };
      assessemtChart.setOption(option);
    },
    scoreChart(data) {
      //https://gallery.echartsjs.com/editor.html?c=x7J3ZPveNK
      var scoreChart = echarts.init(document.getElementById("risk-chart"));
      var nameData = ["Low", "Medium", "High", "Severe"];
      // var dataValue = [data.low, data.moderate, data.high, data.severe];
      // var total = data.low + data.moderate + data.high + data.severe;
      // var dataPoint = [
      //   this.percentageCalculate(data.low, total),
      //   this.percentageCalculate(data.moderate, total),
      //   this.percentageCalculate(data.high, total),
      //   this.percentageCalculate(data.severe, total)
      // ];
      //声明数据
      var chartData = [
        {
          name: "severe Risk",
          value: 50,
          test: "备注1" //自定义参数
        },
        {
          name: "High",
          value: 45,
          test: "备注2"
        },
        {
          name: "Medium",
          value: 34,
          test: "备注3"
        },
        {
          name: "Low",
          value: 12,
          test: "备注4"
        }
      ];
      var myColor = ["#50E3C2", "#E2B557", "#DD9E61", "#CC564C"];
      var option = {
        grid: {
          left: "5%",
          right: "5%",
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: true,
            data: nameData,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                // color: function(value, index) {
                //     var num = myColor.length;
                //     return myColor[index % num]
                // },
                textStyle: {
                  color: "#979797",
                  fontSize: "16"
                }
              },
              formatter: function(value, index) {
                return ["{title|" + value + "} "].join("\n");
              },
              rich: {}
            }
          },
          {
            show: true,
            inverse: true,
            // data: (function(data) {
            // var arr = [];
            // data.forEach(function(items) {
            //     arr.push(items.name);
            // });
            //     return arr;
            // })(chartData), // 载入y轴数据
            axisLine: {
              show: false
            },
            // data: dataValue,
            axisLabel: {
              textStyle: {
                // color: function(value, index) {
                //     var num = myColor.length;
                //     return myColor[index % num]
                // },
                color: "#979797",
                fontSize: "16"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            barGap: "-100%",
            data: chartData,
            // data: dataPoint,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}%"
              }
            }
          }
        ]
      };

      scoreChart.setOption(option);
    },
    // digestionChart(value){
    // },
    mentalChart(value) {
      var mychart = document.getElementById("mental-chart");
      var gChart = echarts.init(mychart);
      var option = {
        title: {
          // text: '居民消费价格指数(上年=100)',
          subtext: ""
        },
        // toolbox: {
        //   feature: {
        //         saveAsImage: {show: true}
        //     }
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          top: "center",
          left: 20,
          data: ["2018", "2017", "2016", "2015", "2014"]
        },
        series: [
          {
            name: "", //Mental
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            data: [
              { value: 102.1, name: "2018" },
              { value: 101.6, name: "2017" },
              { value: 102, name: "2016" },
              { value: 101.4, name: "2015" },
              { value: 102, name: "2014" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      gChart.setOption(option, true);
    },
    sleepChart(value) {},
    worldMap() {
      // 随机0-1000的数
      function randomData() {
        return Math.round(Math.random() * 1000);
      }
      // legend内容
      var legendData = ["a.com", "b.com", "c.com", "d.com"];
      // legend自定义颜色 不设置有默认色
      var legendColor = ["blue", "gray", "#000", "cyan"];
      // 映射颜色  不设置有默认色
      var visColor = ["orangered", "yellow", "lightskyblue"];
      // seriesData Array [{name:'',type:'map',mapType:'china',
      //           label: { normal: {show: true},emphasis: { show: true}},data:[{name:'',value:''},...]},{...}]
      var seriseData = [
        {
          name: "a.com",
          type: "map",
          mapType: "world",
          roam: true,
          itemStyle: {
            emphasis: { label: { show: true } }
          },
          data: [
            { name: "Norway", value: 4891.251 },
            { name: "Nepal", value: 26846.016 },
            { name: "New Zealand", value: 4368.136 },
            { name: "Oman", value: 2802.768 },
            { name: "Pakistan", value: 173149.306 },
            { name: "Panama", value: 3678.128 },
            { name: "Peru", value: 29262.83 },
            { name: "Philippines", value: 93444.322 },
            { name: "Papua New Guinea", value: 6858.945 },
            { name: "Poland", value: 38198.754 },
            { name: "Puerto Rico", value: 3709.671 },
            { name: "North Korea", value: 1.468 },
            { name: "Portugal", value: 10589.792 },
            { name: "Paraguay", value: 6459.721 },
            { name: "Qatar", value: 1749.713 },
            { name: "Romania", value: 21861.476 },
            { name: "Russia", value: 21861.476 },
            { name: "Rwanda", value: 10836.732 },
            { name: "Western Sahara", value: 514.648 },
            { name: "Saudi Arabia", value: 27258.387 },
            { name: "Sudan", value: 35652.002 },
            { name: "South Sudan", value: 9940.929 },
            { name: "Senegal", value: 12950.564 },
            { name: "Solomon Islands", value: 526.447 },
            { name: "Sierra Leone", value: 5751.976 },
            { name: "El Salvador", value: 6218.195 },
            { name: "Somaliland", value: 9636.173 },
            { name: "Somalia", value: 9636.173 },
            { name: "Republic of Serbia", value: 3573.024 },
            { name: "Suriname", value: 524.96 },
            { name: "Slovakia", value: 5433.437 }
          ]
        },
        {
          name: "b.com",
          type: "map",
          mapType: "world",
          roam: true,
          itemStyle: {
            emphasis: { label: { show: true } }
          },
          data: [
            { name: "Afghanistan", value: 28397.812 },
            { name: "Angola", value: 19549.124 },
            { name: "Albania", value: 3150.143 },
            { name: "United Arab Emirates", value: 8441.537 },
            { name: "Argentina", value: 40374.224 },
            { name: "Armenia", value: 2963.496 },
            { name: "French Southern and Antarctic Lands", value: 268.065 },
            { name: "Australia", value: 22404.488 },
            { name: "Austria", value: 8401.924 },
            { name: "Azerbaijan", value: 9094.718 },
            { name: "Burundi", value: 9232.753 },
            { name: "Belgium", value: 10941.288 },
            { name: "Benin", value: 9509.798 },
            { name: "Burkina Faso", value: 15540.284 },
            { name: "Bangladesh", value: 151125.475 },
            { name: "Bulgaria", value: 7389.175 },
            { name: "The Bahamas", value: 66402.316 },
            { name: "Bosnia and Herzegovina", value: 3845.929 },
            { name: "Belarus", value: 9491.07 },
            { name: "Belize", value: 308.595 },
            { name: "Bermuda", value: 64.951 },
            { name: "Bolivia", value: 716.939 },
            { name: "Brazil", value: 195210.154 },
            { name: "Brunei", value: 27.223 },
            { name: "Bhutan", value: 716.939 },
            { name: "Botswana", value: 1969.341 },
            { name: "Central African Republic", value: 4349.921 },
            { name: "Canada", value: 34126.24 },
            { name: "Switzerland", value: 7830.534 },
            { name: "Chile", value: 17150.76 },
            { name: "Niger", value: 15893.746 },
            { name: "Nigeria", value: 159707.78 }
          ]
        },
        {
          name: "c.com",
          type: "map",
          mapType: "world",
          roam: true,
          itemStyle: {
            emphasis: { label: { show: true } }
          },
          data: [
            { name: "Afghanistan", value: 28397.812 },
            { name: "Angola", value: 19549.124 },
            { name: "Albania", value: 3150.143 },
            { name: "United Arab Emirates", value: 8441.537 },
            { name: "Argentina", value: 40374.224 },
            { name: "Armenia", value: 2963.496 },
            { name: "French Southern and Antarctic Lands", value: 268.065 },
            { name: "Australia", value: 22404.488 },
            { name: "Austria", value: 8401.924 },
            { name: "Azerbaijan", value: 9094.718 },
            { name: "Burundi", value: 9232.753 },
            { name: "Belgium", value: 10941.288 },
            { name: "Syria", value: 7830.534 },
            { name: "Chad", value: 11720.781 },
            { name: "Togo", value: 6306.014 },
            { name: "Thailand", value: 66402.316 },
            { name: "Tajikistan", value: 7627.326 },
            { name: "Turkmenistan", value: 5041.995 },
            { name: "East Timor", value: 10016.797 },
            { name: "Trinidad and Tobago", value: 1328.095 },
            { name: "Tunisia", value: 10631.83 },
            { name: "Turkey", value: 72137.546 },
            { name: "United Republic of Tanzania", value: 44973.33 },
            { name: "Uganda", value: 33987.213 },
            { name: "Ukraine", value: 46050.22 },
            { name: "Uruguay", value: 3371.982 },
            { name: "United States of America", value: 312247.116 },
            { name: "Uzbekistan", value: 27769.27 },
            { name: "Venezuela", value: 236.299 },
            { name: "Vietnam", value: 89047.397 },
            { name: "Vanuatu", value: 236.299 },
            { name: "West Bank", value: 13.565 },
            { name: "Yemen", value: 22763.008 },
            { name: "South Africa", value: 51452.352 },
            { name: "Zambia", value: 13216.985 },
            { name: "Zimbabwe", value: 13076.978 }
          ]
        },
        {
          name: "d.com",
          type: "map",
          mapType: "world",
          roam: true,
          itemStyle: {
            emphasis: { label: { show: true } }
          },
          data: [
            { name: "Afghanistan", value: 28397.812 },
            { name: "Angola", value: 19549.124 },
            { name: "Albania", value: 3150.143 },
            { name: "United Arab Emirates", value: 8441.537 },
            { name: "Argentina", value: 40374.224 },
            { name: "Armenia", value: 2963.496 },
            { name: "French Southern and Antarctic Lands", value: 268.065 },
            { name: "Australia", value: 22404.488 },
            { name: "Austria", value: 8401.924 },
            { name: "Azerbaijan", value: 9094.718 },
            { name: "Burundi", value: 9232.753 },
            { name: "Belgium", value: 10941.288 },
            { name: "Benin", value: 9509.798 },
            { name: "Burkina Faso", value: 15540.284 },
            { name: "Bangladesh", value: 151125.475 },
            { name: "Bulgaria", value: 7389.175 },
            { name: "The Bahamas", value: 66402.316 },
            { name: "Bosnia and Herzegovina", value: 3845.929 },
            { name: "Belarus", value: 9491.07 },
            { name: "Belize", value: 308.595 },
            { name: "Bermuda", value: 64.951 },
            { name: "Bolivia", value: 716.939 },
            { name: "Brazil", value: 195210.154 },
            { name: "Brunei", value: 27.223 },
            { name: "Bhutan", value: 716.939 },
            { name: "Botswana", value: 1969.341 },
            { name: "Central African Republic", value: 4349.921 },
            { name: "Canada", value: 34126.24 },
            { name: "Switzerland", value: 7830.534 },
            { name: "Chile", value: 17150.76 },
            { name: "China", value: 1359821.465 },
            { name: "Ivory Coast", value: 60508.978 },
            { name: "Cameroon", value: 20624.343 },
            { name: "Democratic Republic of the Congo", value: 62191.161 },
            { name: "Republic of the Congo", value: 3573.024 },
            { name: "Colombia", value: 46444.798 },
            { name: "Costa Rica", value: 4669.685 },
            { name: "Cuba", value: 11281.768 },
            { name: "Northern Cyprus", value: 1.468 },
            { name: "Cyprus", value: 1103.685 },
            { name: "Czech Republic", value: 10553.701 },
            { name: "Germany", value: 83017.404 },
            { name: "Djibouti", value: 834.036 },
            { name: "Denmark", value: 5550.959 },
            { name: "Dominican Republic", value: 10016.797 },
            { name: "Algeria", value: 37062.82 },
            { name: "Ecuador", value: 15001.072 },
            { name: "Egypt", value: 78075.705 },
            { name: "Eritrea", value: 5741.159 },
            { name: "Spain", value: 46182.038 }
          ]
        }
      ];
      var mychart = document.getElementById("regional-dist");
      var gChart = echarts.init(mychart);
      
      var option = {
        title: {
          text: "Regional Distribution",
          left: "left"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          right: "3%",
          bottom: "3%",
          data: legendData
        },
        color: legendColor,
        visualMap: {
          min: 0,
          max: 400000,
          left: "left",
          bottom: "3%",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          color: visColor
        },
        toolbox: {
          show: true,
          right: "3%",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        series: seriseData
      };
        gChart.setOption(option, true);
    }
  },

  created: function() {
    //Patient Stats
    //world map
    //https://gallery.echartsjs.com/editor.html?c=map-world-dataRange
    //https://gallery.echartsjs.com/editor.html?c=xBJh3XKctZ
    //https://gallery.echartsjs.com/editor.html?c=xBy-GXsGLX
    //https://gallery.echartsjs.com/editor.html?c=xHJQPGBz4b
    this.drawGenderChart();
    this.drawAgeChart();
    this.drawAssChart();

    this.scoreChart();
    //this.digestionChart();

    this.mentalChart();
    this.sleepChart();
    this.worldMap();
  }
};
</script>

<style scoped >
.patient-container {
  text-align: center;
  margin: 0 auto;
  width: 80%;
  display: block;
  background: #fff;
}
/**common style begin*/
.title-size {
  font-size: 24px;
  font-weight: bold;
  color: rgb(74, 74, 74);
  text-align: left;
  margin: 30px 0px 0px 30px;
}
.title-size-h2 {
  font-size: 32px;
  font-weight: bold;
  color: rgb(74, 74, 74);
  text-align: left;
  margin-left: 30px;
}
.pt-title {
  font-size: 16px;
  color: rgb(151, 151, 151);
}
/**common style end*/

.chart-w-h {
  width: 95%;
  height: 300px;
  margin: 0px 30px 0px 10%;
}
/* .chart-w-h div {
  position: initial !important;
} */
.chart-3d-w-h {
  width: 100%;
  height: 200px;
  margin: 0px 30px;
}
.worldchart-w-h{
  height: 450px;
}
.clear:after {
  clear: both;
}
.pt-total {
  padding: 50px 0px 20px 0px;
}
.pt-total .title-content {
  float: left;
}
.all-patients {
  padding: 150px 0px 30px 0px;
  width: 96%;
  margin: 0 auto;
}

.line-st {
  width: 96%;
  margin: 0 auto;
}
.line {
  background: #cacaca;
  height: 1px;
}
.paddingtopbottm20 {
  padding: 20px 0px;
}

.hr-line {
  height: 1px;
  background: rgb(240, 238, 238);
  opacity: 0.3;
}

.pie-region-two {
  width: 48%;
  margin: 30px 0px;
}
.pie-region-two h4 {
  margin: 10px 0px 20px 0px;
  font-size: 16px;
}
.pie-region {
  width: 32%;
  margin: 30px 0px;
}
.pie-region h4 {
  margin: 10px 0px 20px 0px;
  font-size: 16px;
}
.pie-main {
  width: 100%;
  display: -webkit-box;
  /* padding: 0px 0px 30px 0px; */
}

.align-right {
  text-align: right;
}
.margin-right30 {
  padding-right: 30px !important;
}
.margin-bottom30 {
  padding-bottom: 30px !important;
}
.margin-right50 {
  margin-right: 50px;
}
.margin-left10 {
  margin-left: 10px !important;
}
</style>
