
    import { isEmpty, getPathName } from "./utils.js";

    /**
     * 뒤로가기 액션 관련 >>
     * 상세페이지에서 목록으로 이동할 때 이전 상태를 유지하기 위함
     * 페이지 진입할 때 sessionStorage에 param과 page path 쌓고
     * 상세에서 목록으로 뒤로가기 이동할 때 sessionStorage에서 값을 가져와 목록 페이지의 이전 상태를 유지
     * **/
    const NavType = window.PerformanceNavigation.TYPE_BACK_FORWARD;
    export function isBackAction()
    {
        let result = false;
        if (NavType === window.performance.navigation.type)
        {
            let historyPage = sessionStorage.getItem("page");
            if (historyPage === getPathName())
                result = true;
        }

        return result;
    }

    export function setHistoryParam(param)
    {
        param = isEmpty(param) ? '' : JSON.stringify(param);
        sessionStorage.setItem("param", param);
        sessionStorage.setItem("page", getPathName());
    }

    export function getHistoryParam()
    {
        return JSON.parse(sessionStorage.getItem("param"));
    }
    /**
     * 여기까지 뒤로가기 액션 관련 끝
     * **/