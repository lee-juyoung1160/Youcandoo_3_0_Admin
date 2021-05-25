<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Biz extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/biz/biz-list');
    }

    public function create()
    {
        $this->load->template('v2/biz/biz-create');
    }

     public function detail($Route = "")
        {
            switch ($Route) {
                case "":
                    $this->load->template('v2/biz/biz-detail');
                    break;
                case "leader" :
                    $this->load->template('v2/biz/biz-support-leader');
                    break;
                case "doit":
                    $this->load->template('v2/biz/biz-support-doit');
                    break;
            }
        }

    public function update()
    {
        $this->load->template('v2/biz/biz-update');
    }

}