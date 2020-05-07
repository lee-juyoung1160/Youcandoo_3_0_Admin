<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Notice extends CI_Controller {

    public function lists()
        {
            $this->load->layout('notice/notice-list');
        }
    public function create()
    	{
    		$this->load->layout('notice/notice-create');
    	}
    public function detail()
    	{
    		$this->load->layout('notice/notice-detail');
    	}
    public function update()
        {
            $this->load->layout('notice/notice-update');
        }
}