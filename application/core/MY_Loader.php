<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Loader extends CI_Loader {
    
    public function view($view, $vars = array(), $return = FALSE) {
        return $this->_ci_load(array('_ci_view' => $view.'.html', '_ci_vars' => $this->_ci_object_to_array($vars), '_ci_return' => $return));
    }

    public function layout($template_name, $vars = array())
    {
        $CI =& get_instance();
        $CI->load->library('session');
        $SessionData = $CI->session->userdata("user_data");
        if(empty($SessionData))
        {
            redirect("/", "refresh");
        }
        $this->view('layout/header',$vars);
        $this->view('layout/header_sub',$vars);
        $this->view('layout/left',$vars);
        $this->view($template_name,$vars);
        $this->view('layout/footer_sub',$vars);
        $this->view('layout/footer',$vars);
    }
}