function toast(title, icon, duration) {
	uni.showToast({
		title,
		icon,
		duration
	})
}
toast.err = function(title, duration = 3000) {
	uni.showToast({
		title,
		icon: 'error',
		duration
	})
}

// loading提示
toast.loading = (title,duration) =>{
  uni.showToast({
    title:'正在加载中...',
    icon:'loading'
  })
}
export default toast