<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

    public function lists()
        {
            $this->load->layout('admin/admin-list');
        }
    public function create()
        {
            $this->load->layout('admin/admin-create');
        }
    public function detail()
        {
            $this->load->layout('admin/admin-detail');
        }
    public function update()
        {
            $this->load->layout('admin/admin-update');
        }


}