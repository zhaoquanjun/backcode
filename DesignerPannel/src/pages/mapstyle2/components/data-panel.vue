<template>
  <div class="setting-block__section">
    <h3 class="setting-block--title">地址列表</h3>
    <div class="ym-button--column" :class="{ addDisabled }" @click="showAdd">
      添加地址
    </div>
    <ul
      v-show="model.positionList.length > 0"
      class="map-item-wrap row-top__dis"
    >
      <li
        v-for="(item, index) in model.positionList"
        :key="index"
        class="map-item"
      >
        <div class="map-item-title-wrap">
          <div class="map-item__title">{{ item.title }}</div>
          <div class="map-item__description">{{ item.description }}</div>
        </div>
        <div class="edit-wrap">
          <span>
            <i
              :class="
                item.isCenter
                  ? 'iconfont iconicon-des-zuobiao'
                  : 'iconfont iconicon-des-zuobiao cur-address'
              "
              style="margin-left:16px;"
              @click="setDefault(item)"
            ></i>
          </span>
          <span>
            <i
              class="iconfont iconicon-des-bianji"
              style="margin-right:16px"
              @click="editAddr(item, index)"
            ></i>
            <i
              class="iconfont iconshanchu"
              style="margin-right:16px"
              @click="deleteAddr(item)"
            ></i>
          </span>
        </div>
      </li>
    </ul>
    <div
      v-show="model.positionList.length == 0"
      class="no-address-wrap flex-center-center--area"
    >
      <div>
        <div class="no-address-icon"></div>
        <div class="no-address-text">暂无地址</div>
      </div>
    </div>
    <div v-show="addPopover" class="add-dialog-Wrap">
      <div class="add-title">添加地址</div>
      <div class="add-item">
        <div class="add-item-title">详细地址</div>
        <div class="select-address" @click="showSelectAddress">
          <span
            class="select-address-text"
            style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; width:90%"
          >{{ selectedAddress }}</span>
          <i class="iconfont iconicon-des-19 select-address-icon"></i>
        </div>
      </div>
      <div class="add-item">
        <div class="add-item-title">地址标题</div>
        <el-input
          v-model="addressTitle"
          maxlength="20"
          placeholder="请输入地址标题"
        ></el-input>
      </div>
      <div class="add-item">
        <div class="add-item-title">地址描述</div>
        <el-input
          v-model="addressDesc"
          type="textarea"
          :rows="3"
          maxlength="100"
          placeholder="请输入地址描述"
        ></el-input>
      </div>
      <div class="btn-wrap">
        <div class="ym-button--isplain" style="margin-right: 16px;" @click="cancelAdd">取消</div>
        <div class="ym-button--primary" :class="submitDisabled" @click="add">确定</div>
      </div>
      <div class="add-area__corner"></div>
    </div>
    <div v-show="selectPopover" class="map-select__area">
      <div class="mask"></div>
      <div id="content">
        <map-search
          ref="map"
          :model-data="model"
          :is-add-operation="isAddOperation"
          @cancelAddSelect="cancelAddSelect"
          @selectAddress="selectAddress"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MapSearch from './map-search'
export default {
  components: {
    MapSearch
  },
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      isAddOperation: false,
      editIndex: -1,
      timer: null,
      oldRecord: null,
      addPopover: false,
      selectPopover: false,
      selectedAddress: '选择地址',
      addressTitle: '',
      addressDesc: '',
      centerPoint: { lng: 116.402127, lat: 39.929588, address: '' },
      lng: 0,
      lat: 0
    }
  },
  computed: {
    submitDisabled: {
      get: function() {
        return this.selectedAddress != '选择地址' && this.selectedAddress
          ? 'save'
          : 'save disable'
      },
      set: function() {
        return this.selectedAddress != '选择地址' && this.selectedAddress
          ? 'save'
          : 'save disable'
      }
    },
    addDisabled: {
      get: function() {
        return this.model.positionList.length >= 20 ? 'disable' : ''
      },
      set: function() {
        return this.model.positionList.length >= 20 ? 'disable' : ''
      }
    }
  },
  mounted() {
    // this.$refs.map.get(this.centerPoint);
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    setDefault(addressObj) {
      if (addressObj.isCenter) {
        return
      }
      var list = JSON.parse(JSON.stringify(this.model['positionList']))
      var length = list.length
      if (length > 0) {
        for (var i = 0; i < length; i++) {
          if (list[i].id == addressObj.id) {
            list[i].isCenter = true
          } else {
            list[i].isCenter = false
          }
        }
      }
      var oldVal = this.model['positionList']
      if (oldVal != list) {
        const oldData = {}
        const data = {}
        oldData['positionList'] = this.model['positionList']
        data['positionList'] = list
        this.model['positionList'] = list
        this.onDataChange('changeData', oldData, data)
      }
    },
    deleteAddr(addressObj) {
      var newlist = []
      var list = JSON.parse(JSON.stringify(this.model['positionList']))
      var length = list.length
      if (length > 0) {
        for (var i = 0; i < length; i++) {
          if (list[i].id != addressObj.id) {
            newlist.push(list[i])
          }
        }
        if (newlist.length == 1) {
          newlist[0].isCenter = true
        }
      }
      var oldVal = this.model['positionList']
      this.model['positionList'] = newlist
      if (oldVal != newlist) {
        const oldData = {}
        const data = {}
        oldData['positionList'] = list
        data['positionList'] = newlist
        this.onDataChange('changeData', oldData, data)
      }
    },
    editAddr(addressObj, index) {
      this.addPopover = true
      this.selectedAddress = addressObj.detailAddress
      this.addressTitle = addressObj.title
      this.addressDesc = addressObj.description
      this.$set(this.centerPoint, 'lng', addressObj.lng)
      this.$set(this.centerPoint, 'lat', addressObj.lat)
      this.$set(this.centerPoint, 'address', addressObj.detailAddress)
      this.editIndex = index
    },
    getAddressPoint(point) {},
    showAdd() {
      if (this.model.positionList.length >= 20) {
        return
      }
      this.reset()
      this.isAddOperation = true
      this.addPopover = true
    },
    reset() {
      this.lat = this.model['lat']
      this.lng = this.model['lng']
      this.selectedAddress = '选择地址'
      this.addressTitle = ''
      this.addressDesc = ''
      this.editIndex = -1
    },
    cancelAdd() {
      this.reset()
      this.addPopover = false
      this.isAddOperation = false
    },
    add() {
      if (this.selectedAddress == '选择地址' || !this.selectedAddress) {
        return
      }
      if (this.model.positionList.length >= 20 && this.editIndex == -1) {
        this.$notify({
          customClass: 'notify-error',
          message: `地址栏数量已到达上限`,
          showClose: false,
          duration: 1500
        })
      } else {
        var list = JSON.parse(JSON.stringify(this.model['positionList']))
        if (this.editIndex != -1) {
          list[this.editIndex].lat = this.lat
          list[this.editIndex].lng = this.lng
          list[this.editIndex].detailAddress = this.selectedAddress
          list[this.editIndex].title = this.addressTitle
            ? this.addressTitle
            : this.selectedAddress
          list[this.editIndex].description = this.addressDesc
          this.editIndex = -1
        } else {
          var length = list ? list.length : 0
          const id = length == 0 ? 0 : list[length - 1].id + 1
          var addr = {
            id: id,
            lat: this.lat,
            lng: this.lng,
            detailAddress: this.selectedAddress,
            title: this.addressTitle ? this.addressTitle : this.selectedAddress,
            description: this.addressDesc,
            isCenter: length == 0
          }
          list.push(addr)
        }
        var oldVal = this.model['positionList']
        if (oldVal != list) {
          const oldData = {}
          const data = {}
          oldData['positionList'] = this.model['positionList']
          data['positionList'] = list
          this.model['positionList'] = list
          this.onDataChange('changeData', oldData, data)
        }
      }
      this.addPopover = false
      this.reset()
      this.isAddOperation = false
    },
    showSelectAddress() {
      this.$refs.map.get(this.centerPoint)
      this.selectPopover = true
    },
    cancelAddSelect() {
      this.selectPopover = false
    },
    selectAddress(point) {
      this.selectPopover = false
      this.selectedAddress = point.address
      this.lng = point.lng
      this.lat = point.lat
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@static/styles/components/map.scss';
</style>
