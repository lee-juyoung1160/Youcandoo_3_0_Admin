<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Gift extends MY_Controller {


    public function dashboard()
        {
            $this->load->template('v2/gift/gift-dashboard');
        }
    public function index()
        {
            $this->load->template('v2/gift/gift-list');
        }
    public function create()
        {
            $this->load->template('v2/gift/gift-create');
        }
    public function detail()
        {
            $this->load->template('v2/gift/gift-detail');
        }
    public function update()
        {
            $this->load->template('v2/gift/gift-update');
        }
    public function apply()
        {
            $this->load->template('v2/gift/gift-apply-list');
        }
    public function send()
        {
            $this->load->template('v2/gift/gift-send-list');
        }
}


