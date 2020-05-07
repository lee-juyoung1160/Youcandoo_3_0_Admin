<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

    public function lists()
	{
		$this->load->layout('user/user-list');
	}
    
}