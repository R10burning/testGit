<!-- by wzk -->
<template>
  <div>
    <div v-html="strHtml"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      strHtml: `<h1 style="text-align:center;">
	五块石社区卫生服务中心
</h1>
<h2 style="text-align:center;">
	彩超检查报告单
</h2>
<p style="text-align:left;">
	<strong>检查日期：{检查时间}</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>检查编号：</strong>{检查编号}
</p>
<p>
	<strong>姓名</strong><strong>：</strong>陈哲思 &nbsp; &nbsp;&nbsp;<strong>性别：</strong>男<span>&nbsp;&nbsp; &nbsp;&nbsp;</span><strong>年龄：</strong>58岁<span><span>&nbsp;&nbsp; &nbsp;&nbsp;</span></span><strong>住院号：</strong>jzid<span>&nbsp;&nbsp; &nbsp;&nbsp;</span><span></span><strong>床号：</strong>{床号}<span>&nbsp;&nbsp; &nbsp;&nbsp;</span><strong>送检医生：</strong>{送检医生}
</p>
<strong>仪器：</strong>{仪器}<span>&nbsp;&nbsp; &nbsp;&nbsp;</span><strong>检查部门：</strong>{检查部门} <br />
<p style="text-align:center;">
	{图片}
</p>
<br />
<strong>描述：</strong> <br />
<br />
<strong>&nbsp; &nbsp; 肝脏：大小及形态正常，肝实质回声均匀，肝内探及多个无回声团，边界清楚，最大约2.4x2.2cm。肝静脉未见异常，门静脉内径正常。
   胆囊：形态、大小正常，囊壁光滑，腔内未见异常回声，肝内外胆管不扩张。
   胰腺：形态、大小正常，包膜完整，实质回声均质，未见异常回声团块，主胰管不扩张。
   脾脏：形态、大小正常，实质回声均质，未见异常回声团块，脾静脉内径正常。  
   肾脏：大小及形态正常，双侧肾脏内未见肿块及结石，肾实质回声均匀，双侧肾窦部不分离。
   输尿管：双侧输尿管不扩张。
   膀胱：充盈欠佳，壁欠光滑，膀胱腔内未见异常回声。
   前列腺：体积增大，约4.5x3.9x3.4cm，形态欠规则，略向膀胱腔内突出，回声不均，可见斑片状强回声，无声影，未见异常团块影。</strong> <br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 肝脏：大小及形态正常，肝实质回声均匀，肝内未见肿块。肝静脉未见异常，门静脉内径正常。 <br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;胆囊：形态，大小正常，囊壁欠光滑，壁增厚，腔内探及数枚强回声后伴声影，最大约1.5cm,胆内外胆管不扩张。 <br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 胰腺：形态，大小正常，包膜完整，实质回声均质，未见异常回声团块，主胰管不扩张。 <br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; 脾脏：形态、大小正常，实质回声均质，未见异常回声团块，脾静脉内径正常。 <br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 肾脏：大小及形态正常，双侧肾脏内未见肿块及结石，肾实质回声均匀，双侧肾窦部不分离。 <br />
<br />
<strong>提示：</strong> <br />
<br />
&nbsp; &nbsp;  <br />
<br />
&nbsp; &nbsp;&nbsp; <br />
<br />
打印时间：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;记录者：陈哲思 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;医生签名（签字有效）: <br />
<br />
<strong><br />
</strong> <br />
<br />
<p>
	<strong>医学频道：</strong> 
</p>
<p>
	本科室开展以下检查项目：
</p>
<p>
	&nbsp; &nbsp; &nbsp;1、B超、彩超常规检查；
</p>
<p>
	&nbsp; &nbsp; &nbsp;2、小器官及血管检查；
</p>
<p>
	&nbsp; &nbsp; &nbsp;3、联系电话
</p>
<p style="text-align:center;">
	<span style="line-height:1.5;">*本报告仅反映受检者当时情况，供临床医师参考*</span> 
</p>`
    };
  },
  created(){
      this.$store.commit("setPageTitle", "检查报告详情");

  },
  mounted(){
  },
  computed: {},
  methods: {},
  components: {}
}

</script>
<style  scoped>
</style>