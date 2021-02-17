<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends MY_Controller {

	public function index()
	{
        $this->load->template('/v2/main-dashboard');
	}

    public function login()
    {
        $this->load->view('/v2/login/login');
    }

    public function join()
    {
        $this->load->view('/v2/login/join');
    }

    public function auth()
    {
        $this->load->view('/v2/login/mfa');
    }

}