<template>
    <div class="modal dialog-info" id="msgTipDialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <p class="tipP">提示</p>
                <div class="modal-header dialog-bottom">
                    {{msgTip}}
                </div>
                <div class="modal-body" data-dismiss="modal">
                    确认
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['msgTip']
    }
</script>