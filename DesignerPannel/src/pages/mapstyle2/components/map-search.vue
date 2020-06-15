<template>
  <div class="map-wrap">
    <div class="map-title">
      <span class="map-title-text">选择地址</span>
      <span>
        <i class="iconfont iconguanbi map-title-close" @click="cancel"></i>
      </span>
    </div>
    <baidu-map
      class="map"
      ak="CxefYSedmmxgGGLnSa7uz6KaybW74zqF"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      @click="clickHandler"
      @ready="handler"
    >
      <bm-control>
        <el-input
          v-model="searchKeyword"
          class="search-input"
          style="width:280px;margin-left:24px;margin-top:14px;"
          placeholder="点击地图选择地址或输入地址搜索"
          @click="inputClick"
        >
          <i slot="prefix" style="color:#262626;" class="el-input__icon el-icon-search"></i>
        </el-input>
      </bm-control>
      <bm-local-search
        :keyword="searchKeyword"
        :auto-viewport="true"
        :page-capacity="1"
        :panel="false"
        @searchcomplete="searchCallBack"
      ></bm-local-search>
      <bm-marker
        :position="selectPoint"
        :mass-clear="true"
        :dragging="true"
        @dragend="dragend"
      ></bm-marker>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
    <div class="map-footer">
      <div slot="append" class="ym-button--isplain" style="margin-right: 16px;" @click="cancel">取消</div>
      <div slot="append" class="ym-button--primary" @click="save">确定</div>
    </div>
  </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmControl from 'vue-baidu-map/components/controls/Control.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
export default {
  components: {
    BaiduMap,
    BmControl,
    BmLocalSearch,
    BmMarker,
    BmNavigation
  },
  props: {
    modelData: {
      type: Object
    },
    isAddOperation: {
      type: Boolean
    }
  },
  data() {
    return {
      zoom: 15,
      searchKeyword: '',
      selectPoint: { lng: 0, lat: 0, address: '' },
      center: { lng: 116.402127, lat: 39.929588 },
      mapClick: false
    }
  },
  watch: {},
  mounted() {},
  methods: {
    inputClick() {
      this.mapClick = false
    },
    get(centerDefault) {
      this.$set(this.selectPoint, 'lng', centerDefault.lng)
      this.$set(this.selectPoint, 'lat', centerDefault.lat)
      this.$set(this.selectPoint, 'address', centerDefault.address)
      this.$set(this.center, 'lng', centerDefault.lng)
      this.$set(this.center, 'lat', centerDefault.lat)
      this.searchKeyword = centerDefault.address
    },
    handler({ BMap, map }) {
      map.disableDoubleClickZoom()
      window.map = map
    },
    save: function() {
      this.$emit('selectAddress', this.selectPoint)
      this.selectPoint = {}
    },
    cancel: function() {
      this.$emit('cancelAddSelect')
    },
    clickHandler(e) {
      this.mapClick = true
      map.clearOverlays()
      // var myMarker = new BMap.Marker(e.point);
      // map.addOverlay(myMarker);
      // 用所定位的经纬度查找所在地省市街道等信息
      // var point = new BMap.Point(e.point.lng, e.point.lat);
      var gc = new BMap.Geocoder()
      const _this = this
      gc.getLocation(e.point, function(rs) {
        var addr =
                    rs.surroundingPois.length == 0
                      ? rs.address
                      : rs.surroundingPois[0].title
        _this.searchKeyword = addr
        _this.selectPoint.address = addr
      })
      this.selectPoint.lng = e.point.lng
      this.selectPoint.lat = e.point.lat
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    searchCallBack: function(results) {
      if (
        !this.mapClick &&
                results &&
                results.Ar &&
                results.Ar.length > 0
      ) {
        this.selectPoint.lng = results.Ar[0].point.lng
        this.selectPoint.lat = results.Ar[0].point.lat
        this.center.lng = results.Ar[0].point.lng
        this.center.lat = results.Ar[0].point.lat
      }
      this.selectPoint.address = this.searchKeyword
    },
    dragend: function({ type, target, pixel, point }) {}
  }
}
</script>
<style lang="scss" scoped>
@import "@static/styles/components/map-search.scss";
</style>
