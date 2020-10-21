<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Loader extends CI_Loader {
    
    public function view($view, $vars = array(), $return = FALSE) {

        if (method_exists($this, '_ci_object_to_array'))
        {
            return $this->_ci_load(array('_ci_view' => $view.'.html', '_ci_vars' => $this->_ci_object_to_array($vars), '_ci_return' => $return));
        } else {
            return $this->_ci_load(array('_ci_view' => $view.'.html', '_ci_vars' => $this->_ci_prepare_view_vars($vars), '_ci_return' => $return));
        }


//        return $this->_ci_load(array('_ci_view' => $view.'.html', '_ci_vars' => $this->_ci_object_to_array($vars), '_ci_return' => $return));

    }

    public function layout($template_name, $vars = array())
    {
        $CI =& get_instance();
        $SessionData = $CI->session->userdata("user_data");
        if(empty($SessionData))
        {
            // 재접속시 사용될 Referer Cookie Set
            $cookie = array(
                'name'   => 'referer',
                'value'  => uri_string(),
                'expire' => '300',
                'domain' => 'admin.youcandoo.co.kr',
                'path'   => '/'
            );
            set_cookie($cookie);
            redirect("/main/login", "refresh");
            return;
        }

        $this->view('layout/header',$vars);
        $this->view('layout/header_sub',$vars);
        $this->view('layout/left',$vars);
        $this->view($template_name,$vars);
        $this->view('layout/footer_sub',$vars);
        $this->view('layout/footer',$vars);
    }
}