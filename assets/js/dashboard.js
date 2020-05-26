
	/** 현재 연도-월-일 구하기 **/
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() +1;
	let date = today.getDate();
	let hours = today.getHours();
	let minutes = today.getMinutes();
	let result = document.getElementById('today-date');

	month = month < 10 ? '0' + month : month;
	today = today < 10 ? '0' + today : today;
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;

	result.innerHTML = year + '.' + month + '.' + date + '. '+ hours + ':' + minutes + ' 기준';

	/** 넘버 total 카운팅 **/
	$(function(){
		$(".count.total").hide(0).fadeIn(2000)
		$('.count.total').each(function() {
			let $this = $(this),
				countTo = $this.attr('data-count');
			$({ countNum: $this.text()}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing:'linear',
					step: function() {
						$this.text(Math.floor(this.countNum));
					},
					complete: function() {
						$this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					}
				});
		});
	});

	/** 도넛 차트 관련 (내일, 오늘, 종료) **/
	const tomorrowDoughnut = document.getElementById('tomorrow-doughnut');
	const todayDoughnut = document.getElementById('today-doughnut');
	const endDoughnut = document.getElementById('end-doughnut');
	const cancelDoughnut = document.getElementById('cancel-doughnut');
	/** 월 단위로 등록된 두잇 **/
	const monthlyMixedChart = document.getElementById('monthly-mixedChart');
	/** 프로모션 진행 현황 **/
	const proStatusDoughnut = document.getElementById('pro-status-doughnut');
	/** 리워드 현황 **/
	const rewardLine = document.getElementById('reward-line-Chart');
	/**  공통 부분**/
	let colorLine = {color: ['rgb(0, 122, 255)', 'rgba(0, 0, 0, 0)']};
	let backgroundColorDoughnut = {color: ['rgb(0, 48, 135)',  'rgb(0, 122, 255)']};
	let options = {options: {maintainAspectRatio: false, legend: {align: 'start', labels: {fontSize: 12, boxWidth: 12}}}};
	let doughnut = {type:['doughnut']};
	let labels = {label:['일반', '프로모션']};

	/** 도넛 차트 관련 (내일, 오늘, 종료) **/
	let tomorrowChart = new Chart(tomorrowDoughnut, {
		type: doughnut.type,
		data: {
			labels: labels.label,
			datasets: [{
				data: [80, 20],
				backgroundColor:backgroundColorDoughnut.color,
			}]
		},
		options: options.options,
	});

	let todayChart = new Chart(todayDoughnut, {
		type: doughnut.type,
		data: {
			labels: labels.label,
			datasets: [{
				data: [10, 20],
				backgroundColor:backgroundColorDoughnut.color,
			}]
		},
		options: options.options,
	});

	let endChart = new Chart(endDoughnut, {
		type: doughnut.type,
		data: {
			labels: labels.label,
			datasets: [{
				data: [40, 20],
				backgroundColor:backgroundColorDoughnut.color,
			}]
		},
		options: options.options,
	});
	let cancelChart = new Chart(cancelDoughnut, {
		type: doughnut.type,
		data: {
			labels: labels.label,
			datasets: [{
				data: [50, 50],
				backgroundColor:backgroundColorDoughnut.color,
			}]
		},
		options: options.options,
	});

	/** 월 단위로 등록된 두잇 **/
	let monthlyChart = new Chart(monthlyMixedChart, {
		type: 'bar',
		data: {
			datasets: [{
				label: '일반',
				data: [20, 20, 30, 40],
				backgroundColor:backgroundColorDoughnut.color[0],
			}, {
				label: '프로모션',
				data: [18, 50, 30, 20],
				backgroundColor:backgroundColorDoughnut.color[1],
			}, {
				label: 'Total',
				data: [20, 45, 20, 40],
				type: 'line',
				borderColor: colorLine.color[0],
				pointBackgroundColor: colorLine.color[0],
				backgroundColor: colorLine.color[1]
			},
			],
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		options: {
			legend: {
				align: 'start',
				position: 'top'
			}
		}
	});

	/** 프로모션 진행 현황 **/
	let proStatusChart = new Chart(proStatusDoughnut, {
		type: doughnut.type,
		data: {
			labels: ['진행','완료'],
			datasets: [{
				data: [10, 20],
				backgroundColor:['rgb(0, 48, 135)',  'rgba(125, 125, 125, 0.2)'],
			}]
		},
		options: options.options,
	});

	/** 리워드 현황 **/
	let rewardStatusChart = new Chart(rewardLine, {
		type: 'line',
		data: {
			datasets: [{
				label: '프로모션 지급 리워드',
				data: [20, 20, 30, 40, 35, 40, 80],
				borderColor: colorLine.color[0],
				pointBackgroundColor: colorLine.color[0],
				backgroundColor: colorLine.color[1]
			}],
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		options: {
			maintainAspectRatio: false,
			legend: {
				align: 'start',
				position: 'top'
			}
		}
	});