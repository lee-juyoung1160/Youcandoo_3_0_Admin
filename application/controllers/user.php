<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller {

    public function lists()
	{
		$this->load->layout('user/user-list');
	}
	public function detail()
    {
        $this->load->layout('user/user-detail');
    }
    
}