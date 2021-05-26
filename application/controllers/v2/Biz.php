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

    public function detail()
    {
        $this->load->template('v2/biz/biz-detail');
    }

    public function support($Route = "")
    {
        switch ($Route) {
            case "leader":
                $data['idx'] = $this->input->post('idx');
                $this->load->template('v2/biz/biz-support-leader', $data);
                break;
            case "doit":
                $data['idx'] = $this->input->post('idx');
                $this->load->template('v2/biz/biz-support-doit', $data);
                break;
        }
    }

    public function update()
    {
        $this->load->template('v2/biz/biz-update');
    }

}