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
    //HighCharts.chart(this.id, this.dataObj);
  },
  created: function() {
    //Patient Stats
    //world map
    //https://gallery.echartsjs.com/editor.html?c=map-world-dataRange
    //https://gallery.echartsjs.com/editor.html?c=xBJh3XKctZ
    //https://gallery.echartsjs.com/editor.html?c=xBy-GXsGLX
    //https://gallery.echartsjs.com/editor.html?c=xHJQPGBz4b
    //  this.$nextTick(function(){
       this.$nextTick(function () {
          this.drawGenderChart();
          this.drawAgeChart();
          this.drawAssChart();

          this.scoreChart();
          //this.digestionChart();

          this.mentalChart();
          this.sleepChart();
          this.worldMap1();
        });
        //this.worldMap();
      // })
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
      this.chPie.setOption(option, true);
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
      agePie.setOption(option, true);
    },
    drawAssChart(data1) {
      // let div_= document.getElementById("assessemt-pie-chart");
      // div_.removeAttribute("_echarts_instance_");
      // var assessemtChart = echarts.init( div_ );
      // var div_ = document.getElementById('assessemt-pie-chart').removeAttribute('_echarts_instance_'); // 移除容器上的 _echarts_instance_ 属性
      var assessemtChart = echarts.init( document.getElementById("assessemt-pie-chart") );
      //var assessemtChart = echarts.init( div_ );
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
              // { value: 32, name: "" },
              // { value: 23, name: "" }
            ]
          }
        ]
      };
     //刷新数据
      let data= [ { value: 32, name: "" },
               { value: 23, name: "" }]
     
      option.series[0].data = data;
      assessemtChart.setOption(option);  
      //assessemtChart.setOption(option, true);
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

      scoreChart.setOption(option, true);
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
    worldMap1(){
      //https://gallery.echartsjs.com/editor.html?c=xBy-GXsGLX 按区域显示
      // 获取echarts的容器
      var mychart = document.getElementById("regional-dist");
      var gChart = echarts.init(mychart);
    var geoCoordMap = {
        北京: [116.28, 39.54],
       // 杭州: [120.10, 30.15],
       // 南宁: [108.479, 23.1152],
       // 广州: [113.5107, 23.2196],
        重庆: [107.7539, 30.1904],
        上海: [121.4648, 31.2891],
        尼日利亚: [-4.388361, 11.186148],
        洛杉矶: [-118.24311, 34.052713],
        香港: [114.195466, 22.282751],
        芝加哥: [-87.801833, 41.870975],
        加纳库马西: [-4.62829, 7.72415],
        曼彻斯特: [-1.657222, 51.886863],
        汉堡: [10.01959, 54.38474],
        阿拉木图: [45.326912, 41.101891],
        伊尔库茨克: [89.116876, 67.757906],
        巴西: [-48.678945, -10.493623],
        埃及: [31.815593, 31.418032],
        巴塞罗纳: [2.175129, 41.385064],
        柬埔寨: [104.88659, 11.545469],
        米兰: [9.189948, 45.46623],
        蒙得维的亚: [-56.162231, -34.901113],
        莫桑比克: [32.608571, -25.893473],
        阿尔及尔: [3.054275, 36.753027],
        阿联酋迪拜: [55.269441, 25.204514],
        布达佩斯: [17.108519, 48.179162],
        悉尼: [150.993137, -33.675509],
        加州: [-121.910642, 41.38028],
        墨尔本: [144.999416, -37.781726],
        墨西哥: [-99.094092, 19.365711],
        温哥华: [-123.023921, 49.311753]
    };
    var BJData = [[{
              name: "北京",
              value: 12580
          }],[{
              name: "重庆",
              value: 10000000
          }],[{
              name: "上海",
              value: 9100
          }], [{
              name: "尼日利亚",
              value: 9100
          }], [{
              name: "洛杉矶",
              value: 2370
          }], [{
              name: "香港",
              value: 3130
          }], [{
              name: "芝加哥",
              value: 2350
          }], [{
              name: "加纳库马西",
              value: 5120
          }], [{
              name: "曼彻斯特",
              value: 3110
          }], [{
              name: "汉堡",
              value: 6280
          }], [{
              name: "阿拉木图",
              value: 7255
          }], [{
              name: "伊尔库茨克",
              value: 8125
          }], [{
              name: "巴西",
              value: 3590
          }], [{
              name: "埃及",
              value: 3590
          }], [{
              name: "巴塞罗纳",
              value: 3590
          }], [{
              name: "柬埔寨",
              value: 3590
          }], [{
              name: "米兰",
              value: 3590
          }], [{
              name: "蒙得维的亚",
              value: 3590
          }], [{
              name: "莫桑比克",
              value: 3590
          }], [{
              name: "阿尔及尔",
              value: 31590
          }], [{
              name: "阿联酋迪拜",
              value: 13590
          }], [{
              name: "布达佩斯",
              value: 23590
          }], [{
              name: "悉尼",
              value: 3590
          }], [{
              name: "加州",
              value: 3590
          }], [{
              name: "墨尔本",
              value: 3590
          }], [{
              name: "墨西哥",
              value: 3590
          }], [{
              name: "温哥华",
              value: 3590
          }]];

    var series = [];
    [[, BJData]].forEach(function (item, i) {
        series.push({
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
                //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: "stroke", //波纹绘制方式 stroke, fill
                scale: 4
                //波纹圆环最大限制，值越大波纹越大
            },
            label: {
                normal: {
                    show: true,
                    position: "right", //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: "{b}", //圆环显示文字
                    // color:"#666666"
                },
                emphasis: {
                    show: true
                }
            },
            symbol: "circle",
            symbolSize: function (val) {
                var  level = 0 ;
                var state= Math.floor(val[2]/5000) ;
                switch (state)
                {
                    case 0: level=0; break;
                    case 1: level=1; break;
                    case 2: level=2; break;
                    case 3: level=3; break;
                    case 4: level=4; break;
                    case 5: level=5; break;
                    case 6: level=6; break;
                    case 7: level=7; break;
                    case 8: level=8; break;
                    case 9: level=9; break;
                    default: level=10;
                }
                return 5 + level; //圆环大小
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[0].name/*+"\n"+dataItem[0].value*/,
                    value: geoCoordMap[dataItem[0].name]
                        .concat([dataItem[0].value])
                };
            })
        });
    });

   var option = {
        //悬浮提示
        tooltip: {
            trigger: "item",
            backgroundColor: "#1540a1",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            //extraCssText: "z-index:100",formatter,
            formatter: function (params, ticket, callback) {
            debugger;
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value[params.seriesIndex + 1];
                res = "<span style='color:red;'>" + name.toString().split(' ')[0] + value.toString().split(' ')[0];
                return res;
            }
        },
        visualMap: {
            //图例值控制
            min: 0,
            max: 10000,
            text:['High','Low'],
            show: true,
            calculable: true,
            //color: ["#0bc7f3"],
            color: ['#52DE97','#EE763F','#F8D25A']
        },
        geo: {
            map: "world",
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true, //是否允许缩放
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: "180%",
            itemStyle: {
                normal: {
                    color: ["#325D99"], //地图背景色
                    //color: ['orangered','yellow','lightskyblue']
                    borderColor: "#5bc1c9" //省市边界线
                },
                emphasis: {
                    color: "rgba(37, 43, 61, .5)" //悬浮背景
                }
            }
        },

        series: series
    };

    gChart.setOption(option, true);
    }
  },
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
  margin:5%;
}
.clear:after {
  clear: both;
}
.pt-total {
  /* padding: 50px 0px 20px 0px; */
  height: 80px;
  line-height: 80px;
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
