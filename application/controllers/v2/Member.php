<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Member extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/member/member-list');
    }

    public function detail()
    {
        $data['profile_uuid'] = $this->input->post('profile_uuid');
        $this->load->template('v2/member/member-detail', $data);
    }

    public function level()
    {
        $this->load->template('v2/member/level-list');
    }


     public function badge($Route = "")
        {
            switch ($Route) {
                case "":
                    $this->load->template('v2/member/badge-list');
                    break;
                case "create" :
                    $this->load->template('v2/member/badge-create');
                    break;
                case "update":
                    $this->load->template('v2/member/badge-update');
                    break;
                case "detail":
                    $this->load->template('v2/member/badge-detail');
                    break;
            }
        }


}