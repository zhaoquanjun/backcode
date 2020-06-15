  this.$confirm(
                "删除后，图片将被移动到回收站，可在回收站中恢复，是否确定删除？",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                     showCancelButton:false,// 是否显示取消按钮
                     showConfirmButton:true,// 是否显示确认按钮
                     customClass:"medium", // 弹窗大小  large / medium / small 	
                    iconClass:"icon-warning", // 自定义图标 
                    callback: async action => {}
                }
  )    

   this.$notify({
                    customClass:"notify-error",  //  notify-success ||  notify-error
                    message: `图片名称不能为空`,
                    duration: 1000,
                     showClose: false,

                });
                 this.$notify({
                    customClass:"notify-error",  //  notify-success ||  notify-error
                    message: `图片名称不能为空`,
                    duration: 1000,
                     showClose: false,
                });