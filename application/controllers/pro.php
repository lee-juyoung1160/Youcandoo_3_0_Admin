<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pro extends CI_Controller {

    public function lists()
        {
            $this->load->layout('pro/pro-list');
        }
    public function create()
        {
            $this->load->layout('pro/pro-create');
        }
    public function detail()
        {
            $this->load->layout('pro/pro-detail');
        }
    public function update()
        {
            $this->load->layout('pro/pro-update');
        }
}