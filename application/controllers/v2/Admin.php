<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/admin/admin-list');
    }

    public function detail()
    {
        $this->load->template('v2/admin/admin-detail');
    }

    public function update()
    {
        $this->load->template('v2/admin/admin-update');
    }

    public function auth()
    {
        $this->load->template('v2/admin/auth-create');
    }

}


