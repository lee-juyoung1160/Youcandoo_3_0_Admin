<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Biz extends MY_Controller {

    public function lists()
        {
            $this->load->layout('biz/biz-list');
        }
	public function create()
    	{
    		$this->load->layout('biz/biz-create');
    	}
    public function detail()
       	{
       		$this->load->layout('biz/biz-detail');
       	}
    public function update()
         {
            $this->load->layout('biz/biz-update');
         }
}