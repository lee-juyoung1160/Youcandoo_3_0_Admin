<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller {

    public function lists()
	{
		$this->load->layout('user/user-list');
	}
	public function detail()
    {
        $data['profile_uuid'] = $this->input->post('uuid');

        $this->load->layout('user/user-detail', $data);
    }
    
}