<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Push extends CI_Controller {

    public function lists()
        {
            $this->load->layout('push/push-list');
        }
    public function create()
        {
            $this->load->layout('push/push-create');
        }
    public function detail()
        {
            $this->load->layout('push/push-detail');
        }
    public function update()
        {
            $this->load->layout('push/push-update');
        }

}