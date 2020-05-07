<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inquiry extends CI_Controller {

    public function lists()
        {
            $this->load->layout('inquiry/inquiry-list');
        }
    public function create()
        {
            $this->load->layout('inquiry/inquiry-create');
        }
    public function update()
        {
            $this->load->layout('inquiry/inquiry-update');
        }
    public function detail()
        {
            $this->load->layout('inquiry/inquiry-detail');
        }

}