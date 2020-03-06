<template>
  <div class="patient-container">
    <div class="pt-total">
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
    <div class="regional-dist">
      <div style="height:450px"></div>
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
           <div id="risk-chart"  class="chart-w-h"></div>
      </div>
       <div class="pie-region-two">
           <h4>{{$t("homecontent.digestion")}}</h4>
           <div id="digestion-chart"  class="chart-w-h"></div>
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
//import { getChartData ,getLineYMdData} from "./../api/api";
import patientList from "@/components/patientList";

export default {
  components: { patientList },
  data() {
    return {
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null,
      allPatientsNumber: 0,
      allPatientsAssessments: 0,
      formatData: []
    };
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
    riskChart(data) {
      //https://gallery.echartsjs.com/editor.html?c=x7J3ZPveNK
      var riskchart = echarts.init(document.getElementById("risk-chart"));
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
      var chartData = [{
              name: 'severe Risk',
              value: 50,
              test: '备注1' //自定义参数
          },
          {
              name: 'High',
              value: 60,
              test: '备注2'
          },
          {
              name: 'Medium',
              value: 66,
              test: '备注3'
          },
          {
              name: 'Low',
              value: 72,
              test: '备注4'
          },
      ];
      var myColor = ["#50E3C2", "#E2B557", "#DD9E61", "#CC564C"];
      var option = {
        grid: {
          left: "2%",
          right: "2%",
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
            data: (function(data) {
            var arr = [];
            data.forEach(function(items) {
                arr.push(items.name);
            });
                return arr;
            })(chartData), // 载入y轴数据
                inverse: true,
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
            data:chartData,
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

      riskchart.setOption(option);
    },
    showDigestionChart(value){
    var mychart = document.getElementById('digestion-chart');
    var gChart = echarts.init(mychart);
    var option = {
          title : {
              // text: '居民消费价格指数(上年=100)',
              subtext: 'Digestion',
          },
          toolbox: {
            feature: {
                  saveAsImage: {show: true}
              }
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              top:'center',
              left: 20,
              data: ['2018','2017','2016','2015','2014']
          },
          series : [
              {
                  name: '居民消费价格指数(上年=100)',
                  type: 'pie',
                  radius : '60%',
                  center: ['50%', '50%'],
                  data:[
                      {value:102.1, name:'2018'},
                      {value:101.6, name:'2017'},
                      {value:102, name:'2016'},
                      {value:101.4, name:'2015'},
                      {value:102, name:'2014'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
     gChart.setOption(option, true);
     }
  },
  mounted: function() {
    //Patient Stats
    debugger;
    this.drawGenderChart();
    this.drawAgeChart();
    this.drawAssChart();
    this.riskChart();
    this.showDigestionChart();
    // getChartData().then(res => {
    // var data = res.response;
    // var ageDistribution = data.ageDistribution;
    // var assessmentDistribution = data.assessmentDistribution;
    // var overall = data.overall;
    // var riskDistribution = data.riskDistribution;
    // var genderDistribution = data.genderDistribution;

    // this.drawGenderChart(genderDistribution);
    // this.drawAgeChart(data.ageDistribution);
    // this.drawAssChart(data.assessmentDistribution);

    // this.riskChart(riskDistribution);

    // this.allPatientsNumber = overall.patients;
    // this.allPatientsAssessments = overall.assessments;
    //});

    //https://gbvv7o5184.execute-api.us-east-1.amazonaws.com/dev/sante/admin/assessment-trends
    //Assessments Trend
    //  getLineYMdData().then(res => {
    //  var data = res.response;
    //   this.weekLineChart(data.weekly);
    //   this.monthLineChart(data.monthly);
    //   this.yearLineChart(data.yearly);

    //  });

    //All Patients
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
  width: 100%;
  height: 350px;
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

.cicle-stress {
  margin: 10px 0px;
  display: inline-block;
}
.cicle-stress p {
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: rgb(0, 122, 255);
  margin: 3px 5px;
  float: left;
}
.cicle-healthy {
  margin: 10px 0px;
  display: inline-block;
}
.cicle-healthy p {
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: rgb(245, 166, 35);
  margin: 3px 5px;
  float: left;
}
.pie-region-two {
  width: 50%;
  margin: 30px;
}
.pie-region-two h4 {
  margin: 10px 0px 20px 0px;
  font-size: 16px;
}
.pie-region {
  width: 30%;
  margin: 30px;
}
.pie-region h4 {
  margin: 10px 0px 20px 0px;
  font-size: 16px;
}
.pie-main {
  width: 100%;
  display: -webkit-box;
  padding: 0px 0px 30px 0px;
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
